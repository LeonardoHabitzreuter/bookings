import { Modal } from '@mantine/core';
import Button from '@/components/ui/Button';
import useDeleteBooking from './useDeleteBooking';

export const DeleteBooking = () => {
  const { handleSubmit, onClose, booking } = useDeleteBooking()  

  return (
    <Modal
      opened
      onClose={onClose}
      size="md"
      title={<span className='text-lg font-medium'>Delete Booking</span>}
    >
      <p className='text-base font-normal'>
        Are you sure you want to delete your reservation at{' '}
        <strong>{booking.place.address}</strong>?
      </p>
      <form onSubmit={handleSubmit} className='flex justify-end mt-3'>
        <Button variant="destructive" type="submit" className='w-full sm:w-auto'>
          Delete Booking
        </Button>
      </form>
    </Modal>
  );
};
