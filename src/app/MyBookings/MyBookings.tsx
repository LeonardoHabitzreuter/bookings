import { Outlet, useLoaderData } from 'react-router-dom';
import { useBookingsQuery } from '@/queries/bookings';
import { BookingCard } from './BookingCard';
import { ListContainer } from '@/components/ui';

export const MyBookings = () => {
  const initialData = useLoaderData();
  const { data: bookings } = useBookingsQuery({ initialData });

  return (
    <>
      <Outlet />
      <ListContainer data-testid="bookings-content">
        {bookings?.map((booking) => <BookingCard key={booking.id} booking={booking} />)}
      </ListContainer>
    </>
  );
};
