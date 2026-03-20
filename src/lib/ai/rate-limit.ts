export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
}

const ANON_LIMIT = 5;
const AUTH_LIMIT = 20;

// In-memory rate limiting for development
// In production, this would use D1 or Cloudflare KV
const counts = new Map<string, { date: string; count: number }>();

export function checkRateLimit(
  key: string,
  isAuthenticated: boolean
): RateLimitResult {
  const limit = isAuthenticated ? AUTH_LIMIT : ANON_LIMIT;
  const today = new Date().toISOString().split("T")[0];

  const entry = counts.get(key);
  if (!entry || entry.date !== today) {
    counts.set(key, { date: today, count: 1 });
    return { allowed: true, remaining: limit - 1, limit };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, limit };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count, limit };
}
