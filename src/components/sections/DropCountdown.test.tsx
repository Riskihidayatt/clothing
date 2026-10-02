import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { DropCountdown } from "./DropCountdown";

const target = "2026-11-11T19:00:00+07:00";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("<DropCountdown />", () => {
  it("ticks down every second", () => {
    vi.setSystemTime(new Date(target).getTime() - (3600 + 5) * 1000); // 1h 0m 5s left
    render(<DropCountdown target={target} />);
    act(() => vi.advanceTimersByTime(0));

    const timer = screen.getByRole("timer");
    expect(timer).toHaveTextContent("00Hari01Jam00Menit05Detik");

    act(() => vi.advanceTimersByTime(1000));
    expect(timer).toHaveTextContent("00Hari01Jam00Menit04Detik");
  });

  it("switches to the live state once the drop time passes", () => {
    vi.setSystemTime(new Date(target).getTime() + 1000);
    render(<DropCountdown target={target} />);
    act(() => vi.advanceTimersByTime(0));

    expect(screen.queryByRole("timer")).not.toBeInTheDocument();
    expect(screen.getByText(/the drop is live/i)).toBeInTheDocument();
  });
});
