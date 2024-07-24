import { Link } from 'react-router-dom';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Booking } from '@/models/Booking';
import { Card } from '@/components/ui'

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard = ({ booking }: BookingCardProps) => {
  const { place } = booking;

  return (
    <>
      <Card data-testid="booking-card" className='max-w-[400px]'>
      <Card.Image src={place.imageUrl} alt={place.address}>
        <div className='flex absolute right-0 mr-3 mt-3 gap-2'>
          <Link aria-label="Edit" to={`/bookings/edit/${booking.id}`} className='bg-white rounded-full p-1 text-blue-600'>
            <IconPencil size={20} />
          </Link>
          <Link aria-label="Delete" to={`/bookings/delete/${booking.id}`} className='bg-white rounded-full p-1 text-red-600'>
            <IconTrash size={20} />
          </Link>
        </div>
        </Card.Image>
        <Card.Body>
          <span className="text-base font-semibold text-white mt-3">
            {place.address}
          </span>
          <div className='flex justify-between text-white font-normal text-sm'>
            <div>
              <p className='font-medium'>Check in</p>
              <p>{dayjs(booking.start).format('MMMM D, YYYY')}</p>
            </div>
            <div>
              <p className='font-medium'>Check out</p>
              <p>{dayjs(booking.end).format('MMMM D, YYYY')}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
