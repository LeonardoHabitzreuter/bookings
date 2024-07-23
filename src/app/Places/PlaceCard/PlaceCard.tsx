import { Place } from '@/models/Place';
import { Button, Card } from '@/components/ui';
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
      <Card data-testid="place-card">
        <Card.Image src={place.imageUrl} alt={place.address} />
        <Card.Body>
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
        </Card.Body>
      </Card> 
    </>
  );
};
