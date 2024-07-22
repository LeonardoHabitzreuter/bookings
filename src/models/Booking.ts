import { DateRange } from '@/models/DateRange';
import { Place } from '@/models/Place';

export interface Booking extends DateRange {
  id: string;
  place: Place;
}
