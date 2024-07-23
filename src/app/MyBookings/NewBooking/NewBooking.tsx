import { BookingForm } from '../BookingForm';
import { Place } from '@/models/Place';
import useNewBooking from './useNewBooking';

type Props = {
  onClose: () => void
  place: Place
}

export const NewBooking = ({ place, onClose }: Props) => {
  const { allBookings, onSubmit } = useNewBooking(place);

  return (
    <BookingForm
      booking={{ place }}
      otherBookings={allBookings}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};
