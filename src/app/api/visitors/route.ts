import { NextResponse } from "next/server";
import initialData from "@/data/visitors.json";
import { redisGet, redisIncr } from "@/lib/redis";

const BASE_PAGEVIEWS = typeof initialData?.pageviews === "number" ? initialData.pageviews : 1420;
let inMemoryCount = BASE_PAGEVIEWS;

export async function GET() {
  const remote = await redisGet("portfolio:pageviews");
  const count = remote !== null ? BASE_PAGEVIEWS + remote : inMemoryCount;
  return NextResponse.json({ pageviews: count });
}

export async function POST() {
  const remote = await redisIncr("portfolio:pageviews", 1);
  if (remote !== null) {
    return NextResponse.json({ pageviews: BASE_PAGEVIEWS + remote });
  }

  inMemoryCount += 1;
  return NextResponse.json({ pageviews: inMemoryCount });
}
