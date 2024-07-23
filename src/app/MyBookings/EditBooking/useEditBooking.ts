import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useUpdateBookingMutation } from '@/mutations/bookings';
import { useBookingsQuery } from '@/queries/bookings';
import { Booking } from '@/models/Booking';

export default function useEditBooking () {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const initialData = useLoaderData();
  const { data: bookings } = useBookingsQuery({ initialData });
  const booking = bookings?.find(({ id }) => id === bookingId) as Booking;
  const otherBookings = bookings?.filter(({ id }) => id !== bookingId) || [];
  const updateBooking = useUpdateBookingMutation();

  const onClose = () => navigate('/bookings', { replace: true })

  const onSubmit = ([start, end]: Date[]) => {
    updateBooking.mutate({ ...booking!, start, end });
    navigate('/bookings', { replace: true });
  }

  return { onClose, onSubmit, booking, otherBookings }
}