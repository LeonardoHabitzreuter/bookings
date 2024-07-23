import { useNavigate } from 'react-router-dom';
import { BookingForm } from '../BookingForm';
import { Place } from '@/models/Place';
import { useBookingsQuery } from '@/queries/bookings';
import { useCreateBookingMutation } from '@/mutations/bookings';

type Props = {
  onClose: () => void
  place: Place
}

export const NewBooking = ({ place, onClose }: Props) => {
  const navigate = useNavigate();
  const { data: bookings } = useBookingsQuery();
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
