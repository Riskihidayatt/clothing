export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** true once the target time has been reached */
  isOver: boolean;
};

/** Splits the distance between `now` and `target` into d/h/m/s. */
export function getTimeLeft(target: Date | string | number, now: number = Date.now()): TimeLeft {
  const diff = new Date(target).getTime() - now;
  if (!Number.isFinite(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    isOver: false,
  };
}
