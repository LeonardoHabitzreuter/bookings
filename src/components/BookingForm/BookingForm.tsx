import Button from '@/components/ui/Button';
import { Grid, Group, Image, Modal, Space, Text } from '@mantine/core';
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
  onClose?: () => void;
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
      onClose={() => onClose?.()}
      size="lg"
      title={<Text fw={500}>Choose the dates you will stay at:</Text>}
    >
      <Grid data-testid="place-info" align="flex-start">
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <Image src={place?.imageUrl} height={200} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          <h3 className="text-xl font-semibold">{place?.address}</h3>
          <p className="text-base mt-3">{place?.description}</p>
        </Grid.Col>
      </Grid>
      <Space h="md" />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <DatePickerInput
          firstDayOfWeek={0}
          label="Check-in - Checkout"
          minDate={new Date()}
          required
          placeholder="Check-in - Checkout"
          type="range"
          {...form.getInputProps('dates')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">{submitLabel ?? 'Book this place'}</Button>
        </Group>
      </form>
    </Modal>
  );
};
