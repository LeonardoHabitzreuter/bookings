import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { DateRange } from '@/models/DateRange';
import { isOverlapping } from '@/utils/date';
import { Booking } from '@/models/Booking';

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

export default function useBookingForm (
  booking: Partial<Booking>,
  otherBookings: Booking[],
  onSubmit: (dates: [Date, Date]) => void
) {
  const form = useForm({
    validate: zodResolver(schema(otherBookings)),
    initialValues: {
      dates: [booking.start, booking.end],
    },
  });

  const handleSubmit = form.onSubmit(({ dates }: { dates: (Date | undefined)[] }) => {
    const [checkIn, checkOut] = dates;
    if (!checkIn || !checkOut) throw new Error('Unreachable code');

    onSubmit([checkIn, checkOut]);
  });

  const [checkIn, checkOut] = form.values.dates
  const disableSubmit = (!checkIn || !checkOut || !!form.errors.dates)
  return { form, handleSubmit, disableSubmit }
}