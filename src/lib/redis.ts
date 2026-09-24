// Upstash Redis HTTP REST client with universal prefix resolution & graceful fallback
export function getRedisCredentials(): { url: string | null; token: string | null } {
  // 1. Direct standard checks
  let url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_REST_API_URL ||
    process.env.STORAGE_REST_API_URL ||
    process.env.STORAGE_URL ||
    process.env.KV_REST_API_URL ||
    process.env.PORT_GRLDED_REST_API_URL ||
    process.env.PORT_GRLDED_URL ||
    null;

  let token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REDIS_REST_API_TOKEN ||
    process.env.STORAGE_REST_API_TOKEN ||
    process.env.STORAGE_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.PORT_GRLDED_REST_API_TOKEN ||
    process.env.PORT_GRLDED_TOKEN ||
    null;

  if (url && token) return { url, token };

  // 2. Dynamic scan in process.env for any Upstash / Redis / Storage keys injected by Vercel
  if (typeof process !== "undefined" && process.env) {
    for (const [key, val] of Object.entries(process.env)) {
      if (typeof val !== "string" || !val) continue;
      const upper = key.toUpperCase();
      if (!url && (upper.includes("REST_API_URL") || upper.includes("REST_URL") || upper.endsWith("_URL"))) {
        if (upper.includes("REDIS") || upper.includes("UPSTASH") || upper.includes("STORAGE") || upper.includes("KV") || upper.includes("GRLDED") || upper.includes("PORT")) {
          url = val;
        }
      }
      if (!token && (upper.includes("REST_API_TOKEN") || upper.includes("REST_TOKEN") || upper.endsWith("_TOKEN"))) {
        if (upper.includes("REDIS") || upper.includes("UPSTASH") || upper.includes("STORAGE") || upper.includes("KV") || upper.includes("GRLDED") || upper.includes("PORT")) {
          token = val;
        }
      }
    }
  }

  return { url, token };
}

export async function redisIncr(key: string, by = 1): Promise<number | null> {
  const { url, token } = getRedisCredentials();
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/incrby/${encodeURIComponent(key)}/${by}`, {
      headers: { Authorization: `Bearer ${token}` },
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
  const { url, token } = getRedisCredentials();
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
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
