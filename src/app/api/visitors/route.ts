import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/visitors.json");
const INITIAL_PAGEVIEWS = 1420;

function readVisitors(): number {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
      return typeof data.pageviews === "number" ? data.pageviews : INITIAL_PAGEVIEWS;
    }
  } catch {
    // fallback
  }
  return INITIAL_PAGEVIEWS;
}

function saveVisitors(count: number) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ pageviews: count }, null, 2), "utf-8");
  } catch {
    // fallback if readonly filesystem
  }
}

let inMemoryCount = readVisitors();

export async function GET() {
  return NextResponse.json({ pageviews: inMemoryCount });
}

export async function POST() {
  inMemoryCount += 1;
  saveVisitors(inMemoryCount);
  return NextResponse.json({ pageviews: inMemoryCount });
}
