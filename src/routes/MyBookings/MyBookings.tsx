import { Outlet, useLoaderData } from 'react-router-dom';
import { Grid } from '@mantine/core';
import { useBookingsQuery } from '@/queries/bookings';
import { BookingCard } from '@/components/BookingCard';

export const MyBookings = () => {
  const initialData = useLoaderData();
  const { data: bookings } = useBookingsQuery({ initialData });

  return (
    <>
      <Grid data-testid="bookings-content" p="md">
        {bookings?.map((booking) => (
          <Grid.Col key={booking.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <BookingCard booking={booking} />
          </Grid.Col>
        ))}
      </Grid>
      <Outlet />
    </>
  );
};
