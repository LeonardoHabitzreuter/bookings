import { DateRange } from '@/models/DateRange';

export const isOverlapping = (target: DateRange, other: DateRange) => {
  return target.start < other.end && target.end > other.start;
};
