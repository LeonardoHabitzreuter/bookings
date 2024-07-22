import { QueryClient } from '@tanstack/react-query';
import { placesQuery } from '@/queries/places';
import { bookingsQuery } from '@/queries/bookings';

export const placesLoader = (queryClient: QueryClient) => () => {
  return Promise.all([
    queryClient.ensureQueryData(placesQuery()),
    queryClient.ensureQueryData(bookingsQuery()),
  ]);
};
