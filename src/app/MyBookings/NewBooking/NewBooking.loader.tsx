import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { placeByIdQuery } from '@/queries/places';
import { bookingsQuery } from '@/queries/bookings';

export const newBookingLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    return Promise.all([
      queryClient.ensureQueryData(placeByIdQuery(params.placeId!)),
      queryClient.ensureQueryData(bookingsQuery()),
    ]);
  };
