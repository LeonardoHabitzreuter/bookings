import { useNavigate } from 'react-router-dom';
import { useBookingsQuery } from '@/queries/bookings';
import { useCreateBookingMutation } from '@/mutations/bookings';
import { Place } from '@/models/Place';

export default function useNewBooking (place: Place) {
  const navigate = useNavigate();
  const { data: bookings } = useBookingsQuery();
  const createBooking = useCreateBookingMutation();

  const onSubmit = ([start, end]: Date[]) => {
    createBooking.mutate({ place, start, end });
    navigate('/bookings', { replace: true });
  }

  return { onSubmit, allBookings: bookings ?? [] }
}