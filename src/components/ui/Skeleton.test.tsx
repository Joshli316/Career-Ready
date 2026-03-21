import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton, CardSkeleton, FormSkeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders with default classes", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("animate-pulse");
    expect(el).toHaveClass("rounded-lg");
    expect(el).toHaveClass("bg-neutral-200");
  });

  it("accepts custom className", () => {
    const { container } = render(<Skeleton className="h-10 w-full" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("h-10");
    expect(el).toHaveClass("w-full");
  });
});

describe("CardSkeleton", () => {
  it("renders skeleton card structure", () => {
    const { container } = render(<CardSkeleton />);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });
});

describe("FormSkeleton", () => {
  it("renders default 4 rows", () => {
    const { container } = render(<FormSkeleton />);
    // Each row has 2 skeletons (label + input), so 4 rows = 8 skeletons
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBe(8);
  });

  it("renders custom number of rows", () => {
    const { container } = render(<FormSkeleton rows={2} />);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBe(4);
  });
});
