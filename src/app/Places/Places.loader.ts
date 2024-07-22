import { QueryClient } from '@tanstack/react-query';
import { placesQuery } from '@/queries/places';

export const placesLoader = (queryClient: QueryClient) => () => {
  return queryClient.ensureQueryData(placesQuery());
};
