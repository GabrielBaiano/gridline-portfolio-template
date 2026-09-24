import { NextRequest, NextResponse } from "next/server";
import initialData from "@/data/visitors.json";
import { getRedisCredentials, redisGet, redisIncr } from "@/lib/redis";

const BASE_PAGEVIEWS = typeof initialData?.pageviews === "number" ? initialData.pageviews : 1420;
let inMemoryCount = BASE_PAGEVIEWS;

export async function GET(req: NextRequest) {
  const isDebug = req.nextUrl.searchParams.get("debug") === "1";
  const remote = await redisGet("portfolio:pageviews");
  const count = remote !== null ? BASE_PAGEVIEWS + remote : inMemoryCount;

  if (isDebug) {
    const { url, token } = getRedisCredentials();
    return NextResponse.json({
      pageviews: count,
      connectedToRedis: remote !== null,
      hasCredentials: Boolean(url && token),
      baseCount: BASE_PAGEVIEWS,
      remoteOffset: remote,
    });
  }

  return NextResponse.json({ pageviews: count });
}

export async function POST(req: NextRequest) {
  const isDebug = req.nextUrl.searchParams.get("debug") === "1";
  const remote = await redisIncr("portfolio:pageviews", 1);
  if (remote !== null) {
    return NextResponse.json({
      pageviews: BASE_PAGEVIEWS + remote,
      ...(isDebug ? { connectedToRedis: true, remoteOffset: remote } : {}),
    });
  }

  inMemoryCount += 1;
  return NextResponse.json({
    pageviews: inMemoryCount,
    ...(isDebug ? { connectedToRedis: false } : {}),
  });
}
