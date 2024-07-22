import { Link } from 'react-router-dom';
import {
  ActionIcon,
  Card,
  Group,
  Image,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Booking } from '@/models/Booking';

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard = ({ booking }: BookingCardProps) => {
  const { place } = booking;

  return (
    <Card
      data-testid="booking-card"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Group pos="absolute" right={0} mr="sm" mt="sm" gap="xs">
          <ActionIcon
            aria-label="Edit"
            radius="lg"
            variant="white"
            component={Link}
            to={`/bookings/edit/${booking.id}`}
          >
            <IconPencil size={20} />
          </ActionIcon>
          <ActionIcon
            aria-label="Delete"
            radius="lg"
            variant="white"
            component={Link}
            to={`/bookings/delete/${booking.id}`}
          >
            <IconTrash size={20} />
          </ActionIcon>
        </Group>
        <Image src={place.imageUrl} height={160} alt={place.address} />
      </Card.Section>
      <Space h="sm" />
      <Text fw={500}>{place.address}</Text>
      <Space h="sm" />
      <Group justify="space-between">
        <Stack gap={0}>
          <Text size="xs" fw={500}>
            Check-in
          </Text>
          <Text size="sm">{dayjs(booking.start).format('MMMM D, YYYY')}</Text>
        </Stack>
        <Stack gap={0}>
          <Text size="xs" fw={500}>
            Checkout
          </Text>
          <Text size="sm">{dayjs(booking.end).format('MMMM D, YYYY')}</Text>
        </Stack>
      </Group>
    </Card>
  );
};
