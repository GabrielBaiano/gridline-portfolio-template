import { NextResponse } from "next/server";
import initialData from "@/data/visitors.json";

let inMemoryCount = typeof initialData?.pageviews === "number" ? initialData.pageviews : 1420;

export async function GET() {
  return NextResponse.json({ pageviews: inMemoryCount });
}

export async function POST() {
  inMemoryCount += 1;
  return NextResponse.json({ pageviews: inMemoryCount });
}
