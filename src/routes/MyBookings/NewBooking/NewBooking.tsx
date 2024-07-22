import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { usePlaceById } from '@/queries/places';
import { BookingForm } from '@/components/BookingForm';
import { Place } from '@/models/Place';
import { useBookingsQuery } from '@/queries/bookings';
import { Booking } from '@/models/Booking';
import { useCreateBookingMutation } from '@/mutations/bookings';

export const NewBooking = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const [initialPlaceData, initialBookingsData] = useLoaderData() as [
    Place,
    Booking[],
  ];
  const { data: place } = usePlaceById(placeId!, {
    initialData: initialPlaceData,
  });
  const { data: bookings } = useBookingsQuery({
    initialData: initialBookingsData,
  });
  const booking = { place: place as Place };
  const createBooking = useCreateBookingMutation();

  return (
    <BookingForm
      booking={booking}
      otherBookings={bookings ?? []}
      onClose={() => navigate('/bookings', { replace: true })}
      onSubmit={([start, end]) => {
        createBooking.mutate({ ...booking, start, end });
        navigate('/bookings', { replace: true });
      }}
    />
  );
};
