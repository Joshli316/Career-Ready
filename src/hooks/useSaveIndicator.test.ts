import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSaveIndicator } from "./useSaveIndicator";

describe("useSaveIndicator", () => {
  it("starts with saved=false", () => {
    const { result } = renderHook(() => useSaveIndicator());
    expect(result.current.saved).toBe(false);
  });

  it("sets saved=true after showSaved()", () => {
    const { result } = renderHook(() => useSaveIndicator());
    act(() => {
      result.current.showSaved();
    });
    expect(result.current.saved).toBe(true);
  });

  it("resets saved=false after timeout", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSaveIndicator(1000));

    act(() => {
      result.current.showSaved();
    });
    expect(result.current.saved).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(result.current.saved).toBe(false);
    vi.useRealTimers();
  });
});
