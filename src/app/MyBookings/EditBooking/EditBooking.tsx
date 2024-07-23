import { BookingForm } from '../BookingForm';
import useEditBooking from './useEditBooking';

export const EditBooking = () => {
  const { booking, otherBookings, onClose, onSubmit } = useEditBooking()

  return (
    <BookingForm
      booking={booking!}
      otherBookings={otherBookings ?? []}
      submitLabel="Update Booking"
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};
