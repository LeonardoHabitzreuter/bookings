import { Booking } from '@/models/Booking';
import { Place } from '@/models/Place';

export const generatePlace = (place: Partial<Place> = {}): Place => {
  return {
    id: '1',
    address: '',
    description: 'Lorem ipsum',
    imageUrl: '',
    ...place,
  };
};

export const generateBooking = (booking: Partial<Booking> = {}): Booking => {
  return {
    id: '1',
    start: new Date(),
    end: new Date(),
    place: generatePlace(),
    ...booking,
  };
};
