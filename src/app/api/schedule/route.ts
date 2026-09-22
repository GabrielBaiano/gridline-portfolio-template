import { NextRequest, NextResponse } from "next/server";

// Rate limiting in-memory store: Map<IP, Array<timestamp>>
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 bookings per IP per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Generate Google Service Account JWT Token natively using Node crypto without extra heavy packages
async function getGoogleAuthToken(clientEmail: string, privateKeyPem: string): Promise<string> {
  const crypto = await import("crypto");

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/calendar.events",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const base64Url = (obj: object | string) => {
    const str = typeof obj === "string" ? obj : JSON.stringify(obj);
    return Buffer.from(str)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const encodedHeader = base64Url(header);
  const encodedClaim = base64Url(claimSet);
  const signInput = `${encodedHeader}.${encodedClaim}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signInput);
  signer.end();

  // Normalize private key from env
  const formattedKey = privateKeyPem.replace(/\\n/g, "\n");
  const signature = signer
    .sign(formattedKey, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const jwt = `${signInput}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Auth Token request failed: ${errText}`);
  }

  const tokenData = await res.json();
  return tokenData.access_token;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Anti-Spam Rate Limit
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before scheduling again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, topic, date, timeSlot, honeypot } = body;

    // 2. Anti-Spam: Honeypot check (hidden input that bots fill)
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Meeting scheduled." }); // Silent reject for spam bots
    }

    // 3. Validation
    if (!name || !email || !date || !timeSlot) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address format." }, { status: 400 });
    }

    // Combine date and time slot (e.g. date: "2026-09-25", timeSlot: "14:00")
    const startIso = new Date(`${date}T${timeSlot}:00-03:00`).toISOString();
    const endIso = new Date(new Date(startIso).getTime() + 30 * 60 * 1000).toISOString(); // 30 min default call

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    // 4. Fallback / Test mode if env keys are not provided yet
    if (!clientEmail || !privateKey) {
      const mockMeetUrl = `https://meet.google.com/test-meet-${Math.random().toString(36).substring(2, 7)}`;
      return NextResponse.json({
        success: true,
        isMock: true,
        message: "Demo Mode: Google API keys not found in .env. Event simulated.",
        meetUrl: mockMeetUrl,
        summary: `Meeting: ${name} · ${topic || "Intro Call"}`,
        start: startIso,
        end: endIso,
      });
    }

    // 5. Authenticate with Google
    const accessToken = await getGoogleAuthToken(clientEmail, privateKey);

    // 6. Create Google Calendar Event with automatic Google Meet conference link
    const eventPayload = {
      summary: `Intro Call: Gabriel Gama & ${name}`,
      description: `Topic: ${topic || "Introduction / Project Discussion"}\nBooked via portfolio website.`,
      start: { dateTime: startIso },
      end: { dateTime: endIso },
      attendees: [{ email }, { email: "gabrielngama@gmail.com" }],
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    const calendarRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventPayload),
      }
    );

    if (!calendarRes.ok) {
      const errDetail = await calendarRes.text();
      return NextResponse.json(
        { error: "Failed to schedule event on Google Calendar.", details: errDetail },
        { status: 500 }
      );
    }

    const createdEvent = await calendarRes.json();
    const meetUrl =
      createdEvent.conferenceData?.entryPoints?.find((e: { entryPointType: string }) => e.entryPointType === "video")?.uri ||
      createdEvent.hangoutLink ||
      "";

    return NextResponse.json({
      success: true,
      meetUrl,
      eventLink: createdEvent.htmlLink,
      start: createdEvent.start?.dateTime || startIso,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
