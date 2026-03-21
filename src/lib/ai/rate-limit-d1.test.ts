import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkRateLimitD1 } from "./rate-limit";

interface MockStatement {
  bind: ReturnType<typeof vi.fn>;
  first: ReturnType<typeof vi.fn>;
  run: ReturnType<typeof vi.fn>;
}

function createMockD1() {
  const mockStatement: MockStatement = {
    bind: vi.fn(),
    first: vi.fn(),
    run: vi.fn(),
  };
  // bind returns the same statement so chaining works
  mockStatement.bind.mockReturnValue(mockStatement);

  const mockD1 = {
    prepare: vi.fn().mockReturnValue(mockStatement),
  };

  return { mockD1: mockD1 as unknown as D1Database, mockStatement };
}

describe("checkRateLimitD1", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("allows first request (INSERT succeeds, no existing row)", async () => {
    const { mockD1, mockStatement } = createMockD1();
    // SELECT returns null (no existing row)
    mockStatement.first.mockResolvedValue(null);
    mockStatement.run.mockResolvedValue({});

    const result = await checkRateLimitD1(mockD1, "user:123", false);

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4); // ANON_LIMIT(5) - 1
    expect(result.limit).toBe(5);
  });

  it("blocks when at limit (SELECT returns requests >= limit)", async () => {
    const { mockD1, mockStatement } = createMockD1();
    // SELECT returns row at limit
    mockStatement.first.mockResolvedValue({ requests: 5 });

    const result = await checkRateLimitD1(mockD1, "user:456", false);

    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.limit).toBe(5);
  });

  it("returns correct remaining count", async () => {
    const { mockD1, mockStatement } = createMockD1();
    // Authenticated user with 10 requests so far
    mockStatement.first.mockResolvedValue({ requests: 10 });
    mockStatement.run.mockResolvedValue({});

    const result = await checkRateLimitD1(mockD1, "user:789", true);

    expect(result.allowed).toBe(true);
    // AUTH_LIMIT(20) - (10 + 1) = 9
    expect(result.remaining).toBe(9);
    expect(result.limit).toBe(20);
  });

  it("falls back to in-memory when D1 throws", async () => {
    const { mockD1, mockStatement } = createMockD1();
    mockStatement.first.mockRejectedValue(new Error("D1 unavailable"));

    const result = await checkRateLimitD1(mockD1, "fallback-key", false);

    // Should succeed via in-memory fallback
    expect(result.allowed).toBe(true);
    expect(result.limit).toBe(5);
    expect(result.remaining).toBe(4);
  });
});
