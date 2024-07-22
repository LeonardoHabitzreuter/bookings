import { useLoaderData, useNavigate } from 'react-router-dom';
import { BookingForm } from '../BookingForm';
import { Place } from '@/models/Place';
import { useBookingsQuery } from '@/queries/bookings';
import { Booking } from '@/models/Booking';
import { useCreateBookingMutation } from '@/mutations/bookings';

type Props = {
  onClose: () => void
  place: Place
}

export const NewBooking = ({ place, onClose }: Props) => {
  const navigate = useNavigate();
  const [, initialBookingsData] = useLoaderData() as [Place, Booking[]];
  const { data: bookings } = useBookingsQuery({
    initialData: initialBookingsData,
  });
  const booking = { place: place as Place };
  const createBooking = useCreateBookingMutation();

  return (
    <BookingForm
      booking={booking}
      otherBookings={bookings ?? []}
      onClose={onClose}
      onSubmit={([start, end]) => {
        createBooking.mutate({ ...booking, start, end });
        navigate('/bookings', { replace: true });
      }}
    />
  );
};
