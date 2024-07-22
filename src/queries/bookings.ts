import { Booking } from '@/models/Booking';
import { getAll, getById } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';

const normalizeBooking = (booking: Booking): Booking => {
  return {
    ...booking,
    start: new Date(booking.start),
    end: new Date(booking.end),
  };
};

export const bookingsQuery = ({ ...params } = {}) => ({
  queryKey: ['bookings'],
  queryFn: async () => (await getAll('bookings')).map(normalizeBooking),
  staleTime: 30 * 1000,
  ...params,
});

export const bookingByIdQuery = (id: string, { ...params } = {}) => ({
  queryKey: ['bookings', id],
  queryFn: async () => normalizeBooking(await getById('bookings', id)),
  staleTime: 30 * 1000,
  ...params,
});

export const useBookingsQuery = ({ ...params } = {}) => {
  return useQuery(bookingsQuery(params));
};

export const useBookingById = (id: string, { ...params } = {}) => {
  return useQuery(bookingByIdQuery(id, params));
};
