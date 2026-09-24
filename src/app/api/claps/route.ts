import { NextRequest, NextResponse } from "next/server";
import { portfolioData } from "@/data/portfolio";
import { redisGet, redisIncr } from "@/lib/redis";

const inMemoryClaps = new Map<string, number>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const isDebug = searchParams.get("debug") === "1";

  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter." }, { status: 400 });
  }

  const blog = portfolioData.blogs.find((b) => b.slug === slug);
  const baseClaps = blog?.claps ?? 0;

  const remote = await redisGet(`portfolio:claps:${slug}`);
  const current = remote !== null ? baseClaps + remote : (inMemoryClaps.get(slug) ?? baseClaps);

  return NextResponse.json({
    slug,
    claps: current,
    ...(isDebug ? { connectedToRedis: remote !== null, baseClaps, remoteOffset: remote } : {}),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, count = 1 } = body;

    if (!slug) {
      return NextResponse.json({ error: "Missing slug parameter." }, { status: 400 });
    }

    const blog = portfolioData.blogs.find((b) => b.slug === slug);
    const baseClaps = blog?.claps ?? 0;

    // Rate cap: max 10 claps per single request to prevent script flooding
    const safeIncrement = Math.min(Math.max(Number(count) || 1, 1), 10);

    const remote = await redisIncr(`portfolio:claps:${slug}`, safeIncrement);
    if (remote !== null) {
      return NextResponse.json({ slug, claps: baseClaps + remote });
    }

    const current = inMemoryClaps.get(slug) ?? baseClaps;
    const updated = current + safeIncrement;
    inMemoryClaps.set(slug, updated);

    return NextResponse.json({ slug, claps: updated });
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
