import { QueryClient } from '@tanstack/react-query';
import { bookingsQuery } from '@/queries/bookings';

export const editBookingLoader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(bookingsQuery());
};
