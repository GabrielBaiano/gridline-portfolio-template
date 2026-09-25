import { NextRequest, NextResponse } from "next/server";
import initialData from "@/data/visitors.json";
import { getRedisCredentials, redisGet, redisIncr } from "@/lib/redis";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BASE_PAGEVIEWS = typeof initialData?.pageviews === "number" ? initialData.pageviews : 1422;
let inMemoryCount = BASE_PAGEVIEWS;

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
};

export async function GET(req: NextRequest) {
  const isDebug = req.nextUrl.searchParams.get("debug") === "1";
  const remote = await redisGet("portfolio:pageviews");
  const count = remote !== null ? BASE_PAGEVIEWS + remote : inMemoryCount;

  if (isDebug) {
    const { url, token } = getRedisCredentials();
    return NextResponse.json(
      {
        pageviews: count,
        connectedToRedis: remote !== null,
        hasCredentials: Boolean(url && token),
        baseCount: BASE_PAGEVIEWS,
        remoteOffset: remote,
      },
      { headers: noCacheHeaders }
    );
  }

  return NextResponse.json({ pageviews: count }, { headers: noCacheHeaders });
}

export async function POST(req: NextRequest) {
  const isDebug = req.nextUrl.searchParams.get("debug") === "1";
  const remote = await redisIncr("portfolio:pageviews", 1);
  if (remote !== null) {
    return NextResponse.json(
      {
        pageviews: BASE_PAGEVIEWS + remote,
        ...(isDebug ? { connectedToRedis: true, remoteOffset: remote } : {}),
      },
      { headers: noCacheHeaders }
    );
  }

  inMemoryCount += 1;
  return NextResponse.json(
    {
      pageviews: inMemoryCount,
      ...(isDebug ? { connectedToRedis: false } : {}),
    },
    { headers: noCacheHeaders }
  );
}
