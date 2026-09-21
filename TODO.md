# TODO: Automated Scheduling Bot (Google Calendar & Meet)

Plan and implementation roadmap for an automated agent/bot that inspects calendar availability and schedules meetings with a Google Meet link.

---

## 1. Approaches

### Option A: Cal.com Native Integration (Zero Maintenance)
- [ ] Connect Google Calendar to [Cal.com](https://cal.com/gabrielbaiano).
- [ ] Enable automatic Google Meet conference generation on booking confirmation.
- [ ] Embed the Cal.com inline modal/popover directly into the portfolio (`@calcom/embed-react`) instead of redirecting externally.

### Option B: Custom Fullstack Scheduling Agent / Bot (Next.js + Google Calendar API)
- [ ] **Google Cloud Setup**:
  - [ ] Create GCP Project and enable Google Calendar API.
  - [ ] Configure OAuth2 credentials (Client ID, Secret, Refresh Token) or Service Account with Domain-Wide Delegation.
  - [ ] Set required scope: `https://www.googleapis.com/auth/calendar.events`.
- [ ] **Backend Endpoints (`/api/calendar/`)**:
  - [ ] `GET /api/calendar/availability`: Queries `calendar.freebusy.query` to find open slots within working hours (respecting timezone `America/Sao_Paulo`).
  - [ ] `POST /api/calendar/schedule`: Calls `calendar.events.insert` with:
    - `attendees`: Gabriel + visitor's email.
    - `conferenceData.createRequest`: Generates dynamic `hangoutsMeet` link automatically.
    - `sendUpdates: "all"`: Triggers native Google Calendar email invitations to both parties.
- [ ] **Frontend UI / Bot Widget**:
  - [ ] Interactive scheduling modal or natural language chat widget triggered by "Book an intro call".
  - [ ] Time slot picker displaying available slots.
  - [ ] Form for name, email, and meeting topic.
  - [ ] Instant confirmation screen with the generated Google Meet link.
- [ ] **Automated Reminders & Observability**:
  - [ ] Webhook to notify on Telegram or Discord when a new call is booked.

---

## 2. Technical Reference (Google Calendar API Node.js Snippet)

```ts
import { google } from "googleapis";

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

// 1. Check availability
const freeBusy = await calendar.freebusy.query({
  requestBody: {
    timeMin: startTime.toISOString(),
    timeMax: endTime.toISOString(),
    items: [{ id: "primary" }],
  },
});

// 2. Create event with Google Meet link
const response = await calendar.events.insert({
  calendarId: "primary",
  conferenceDataVersion: 1,
  sendUpdates: "all",
  requestBody: {
    summary: `Intro Call: Gabriel Gama & ${guestName}`,
    description: topic,
    start: { dateTime: selectedSlotStart },
    end: { dateTime: selectedSlotEnd },
    attendees: [{ email: guestEmail }, { email: "gabrielngama@gmail.com" }],
    conferenceData: {
      createRequest: {
        requestId: crypto.randomUUID(),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  },
});

const meetUrl = response.data.hangoutLink;
```
