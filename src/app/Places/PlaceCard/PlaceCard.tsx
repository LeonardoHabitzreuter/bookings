import { Card } from '@mantine/core';
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
        radius="lg"
        withBorder
      >
        <Card.Section>
          <img className='w-full h-48' src={place.imageUrl} alt={place.address} />
        </Card.Section>
        <span className="text-base font-semibold text-white mt-3">
          {place.address}
        </span>
        <p className='text-white line-clamp-2 font-light' title={place.description}>
          {place.description}
        </p>
        <Button
          data-testid='book-button'
          size="lg"
          className="w-full mt-2"
          onClick={() => setOpenForm(true)}
        >
          Book
        </Button>
      </Card>
    </>
  );
};
