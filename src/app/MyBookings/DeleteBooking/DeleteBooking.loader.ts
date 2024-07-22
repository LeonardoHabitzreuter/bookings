import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { bookingByIdQuery } from '@/queries/bookings';

export const deleteBookingLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    return queryClient.ensureQueryData(bookingByIdQuery(params.bookingId!));
  };
