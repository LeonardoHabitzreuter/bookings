import { Card, Image, Space, Text } from '@mantine/core';
import { Place } from '@/models/Place';
import Button from '@/components/ui/Button';
import { NewBooking } from '@/app/MyBookings/NewBooking';
import { useState } from 'react';

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  const [openForm, setOpenForm] = useState(false)
  return (
    <>
      {openForm && <NewBooking place={place} onClose={() => setOpenForm(false)} />}
      <Card
        bg="transparent"
        data-testid="place-card"
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
      >
        <Card.Section>
          <Image src={place.imageUrl} height={160} alt={place.address} />
        </Card.Section>
        <Space h="sm" />
        <span className="text-base font-semibold text-white">
          {place.address}
        </span>
        <Text c="white" fw={300} lineClamp={2} title={place.description}>
          {place.description}
        </Text>
        <Button size="lg" className="w-full mt-2" onClick={() => setOpenForm(true)}>
          Book
        </Button>
      </Card>
    </>
  );
};
