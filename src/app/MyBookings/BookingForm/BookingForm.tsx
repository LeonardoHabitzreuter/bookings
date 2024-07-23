import { Button, Modal } from '@/components/ui';
import { DatePickerInput } from '@mantine/dates';
import { Booking } from '@/models/Booking';
import useBookingForm from './useBookingForm';

interface BookingFormProps {
  booking: Partial<Booking>;
  otherBookings: Booking[];
  submitLabel?: string;
  onClose: () => void;
  onSubmit: (dates: [Date, Date]) => void;
}

export const BookingForm = ({
  booking,
  otherBookings,
  submitLabel,
  onClose,
  onSubmit,
}: BookingFormProps) => {
  const { place } = booking;
  const { form, handleSubmit, disableSubmit } = useBookingForm(booking, otherBookings, onSubmit)

  return (
    <Modal
      centered
      opened
      onClose={onClose}
      styles={{ content: { borderRadius: '12px' } }}
      classNames={{ body: 'flex flex-col items-center px-10 space-y-3 text-center' }}
    >
      <img src={place?.imageUrl} className='w-full rounded-2xl' />
      <h4 data-testid='place-address' className="text-xl font-semibold">{place?.address}</h4>
      <p data-testid='place-description' className="text-sm font-normal text-zinc-500">{place?.description}</p>
      <form data-testid='booking-form' onSubmit={handleSubmit} className='w-full space-y-3'>
        <DatePickerInput
          firstDayOfWeek={0}
          minDate={new Date()}
          required
          placeholder="Check in - Check out"
          type="range"
          {...form.getInputProps('dates')}
        />

          <Button
            type="submit"
            disabled={disableSubmit}
            className='w-full sm:w-80'
          >
            {submitLabel ?? 'Book this place'}
          </Button>
      </form>
    </Modal>
  );
};
