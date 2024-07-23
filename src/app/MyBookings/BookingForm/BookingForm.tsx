import Button from '@/components/ui/Button';
import { Modal } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Booking } from '@/models/Booking';
import { DateRange } from '@/models/DateRange';
import { isOverlapping } from '@/utils/date';

const schema = (otherRanges: DateRange[]) =>
  z.object({
    dates: z.tuple([z.date(), z.date()]).refine(
      ([start, end]) => {
        const current = { start, end };
        const hasOverlaps = otherRanges.some((other) =>
          isOverlapping(current, other),
        );
        return !hasOverlaps;
      },
      { message: 'There is an overlap with another Booking' },
    ),
  });

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
  const form = useForm({
    validate: zodResolver(schema(otherBookings)),
    initialValues: {
      dates: [booking.start, booking.end],
    },
  });
  const handleSubmit = ({ dates }: { dates: (Date | undefined)[] }) => {
    const [firstDate, secondDate] = dates;
    if (!firstDate || !secondDate) throw new Error('Unreachable code');

    onSubmit([firstDate, secondDate]);
  };

  return (
    <Modal
      opened={true}
      onClose={onClose}
      styles={{ content: { borderRadius: '12px' } }}
      classNames={{ body: 'flex flex-col items-center px-10 space-y-3 text-center' }}
    >
      <img src={place?.imageUrl} className='w-full rounded-2xl' />
      <h4 data-testid='place-address' className="text-xl font-semibold">{place?.address}</h4>
      <p data-testid='place-description' className="text-base">{place?.description}</p>
      <form data-testid='booking-form' onSubmit={form.onSubmit(handleSubmit)} className='w-full space-y-3'>
        <DatePickerInput
          firstDayOfWeek={0}
          minDate={new Date()}
          required
          placeholder="Check in - Check out"
          type="range"
          {...form.getInputProps('dates')}
        />

          <Button className='w-full sm:w-80' type="submit">{submitLabel ?? 'Book this place'}</Button>
      </form>
    </Modal>
  );
};
