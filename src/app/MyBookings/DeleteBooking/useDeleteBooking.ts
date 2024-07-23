import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { Booking } from '@/models/Booking';
import { useDeleteBookingMutation } from '@/mutations/bookings';

export default function useDeleteBooking () {
  const navigate = useNavigate();
  const booking = useLoaderData() as Booking;
  const form = useForm();
  const deleteBooking = useDeleteBookingMutation();

  const handleSubmit = form.onSubmit(() => {
    deleteBooking.mutate(booking);
    navigate('/bookings', { replace: true });
  })

  const onClose = () => navigate('/bookings', { replace: true })

  return { booking, handleSubmit, onClose }
}