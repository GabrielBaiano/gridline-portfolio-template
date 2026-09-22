// Upstash Redis HTTP REST client with graceful fallback
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export async function redisIncr(key: string, by = 1): Promise<number | null> {
  if (!REDIS_URL || !REDIS_TOKEN) return null;

  try {
    const res = await fetch(`${REDIS_URL}/incrby/${encodeURIComponent(key)}/${by}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.result === "number" ? data.result : null;
  } catch {
    return null;
  }
}

export async function redisGet(key: string): Promise<number | null> {
  if (!REDIS_URL || !REDIS_TOKEN) return null;

  try {
    const res = await fetch(`${REDIS_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const parsed = parseInt(data.result, 10);
    return isNaN(parsed) ? null : parsed;
  } catch {
    return null;
  }
}
