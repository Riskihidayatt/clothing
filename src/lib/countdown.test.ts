import { describe, expect, it } from "vitest";
import { getTimeLeft } from "./countdown";

const target = "2026-11-11T19:00:00+07:00";
const targetMs = new Date(target).getTime();

describe("getTimeLeft", () => {
  it("splits the remaining time into days/hours/minutes/seconds", () => {
    const now = targetMs - ((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000;
    expect(getTimeLeft(target, now)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5, isOver: false });
  });

  it("is over exactly at the target and after it", () => {
    expect(getTimeLeft(target, targetMs).isOver).toBe(true);
    expect(getTimeLeft(target, targetMs + 60_000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
  });

  it("treats an invalid date as over instead of returning NaN", () => {
    expect(getTimeLeft("not-a-date", Date.now()).isOver).toBe(true);
  });
});
