import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { BookingForm } from '@/components/BookingForm';
import { useUpdateBookingMutation } from '@/mutations/bookings';
import { useBookingsQuery } from '@/queries/bookings';

export const EditBooking = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const initialData = useLoaderData();
  const { data: bookings } = useBookingsQuery({ initialData });
  const booking = bookings?.find(({ id }) => id === bookingId);
  const otherBookings = bookings?.filter(({ id }) => id !== bookingId);
  const updateBooking = useUpdateBookingMutation();

  return (
    <BookingForm
      booking={booking!}
      otherBookings={otherBookings ?? []}
      submitLabel="Update Booking"
      onClose={() => navigate('/bookings', { replace: true })}
      onSubmit={([start, end]) => {
        updateBooking.mutate({ ...booking!, start, end });
        navigate('/bookings', { replace: true });
      }}
    />
  );
};
