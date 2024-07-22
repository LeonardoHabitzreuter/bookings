import { QueryClient } from '@tanstack/react-query';
import { bookingsQuery } from '@/queries/bookings';

export const myBookingsLoader = (queryClient: QueryClient) => () => {
  return queryClient.ensureQueryData(bookingsQuery());
};
