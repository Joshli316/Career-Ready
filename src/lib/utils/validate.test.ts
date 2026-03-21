import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isValidDate,
  truncate,
  MAX_LENGTHS,
} from "./validate";

describe("isValidEmail", () => {
  it("accepts valid emails", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("first.last@domain.co")).toBe(true);
    expect(isValidEmail("user+tag@gmail.com")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("notanemail")).toBe(false);
    expect(isValidEmail("@domain.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("user @domain.com")).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("accepts valid phone numbers", () => {
    expect(isValidPhone("5555555555")).toBe(true);
    expect(isValidPhone("(555) 555-5555")).toBe(true);
    expect(isValidPhone("555-555-5555")).toBe(true);
    expect(isValidPhone("+1 555-555-5555")).toBe(true);
  });

  it("rejects invalid phone numbers", () => {
    expect(isValidPhone("123")).toBe(false);
    expect(isValidPhone("abc")).toBe(false);
    expect(isValidPhone("")).toBe(false);
  });
});

describe("isValidUrl", () => {
  it("accepts valid URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://example.com")).toBe(true);
    expect(isValidUrl("example.com")).toBe(true);
  });

  it("accepts empty string (optional)", () => {
    expect(isValidUrl("")).toBe(true);
  });

  it("rejects invalid URLs", () => {
    expect(isValidUrl("not a url at all")).toBe(false);
  });
});

describe("isValidDate", () => {
  it("accepts valid dates", () => {
    expect(isValidDate("2026-01-15")).toBe(true);
    expect(isValidDate("January 15, 2026")).toBe(true);
  });

  it("accepts empty string (optional)", () => {
    expect(isValidDate("")).toBe(true);
  });

  it("rejects invalid dates", () => {
    expect(isValidDate("not a date")).toBe(false);
  });
});

describe("truncate", () => {
  it("returns string unchanged if under limit", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates to max length", () => {
    expect(truncate("hello world", 5)).toBe("hello");
  });

  it("handles exact length", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });
});

describe("MAX_LENGTHS", () => {
  it("has expected keys", () => {
    expect(MAX_LENGTHS.name).toBe(100);
    expect(MAX_LENGTHS.email).toBe(254);
    expect(MAX_LENGTHS.bulletPoint).toBe(500);
    expect(MAX_LENGTHS.statement).toBe(2000);
  });
});
