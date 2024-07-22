import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Booking } from '@/models/Booking';
import { deleteById, patchById, post } from '@/utils/request';

type NewBooking = Omit<Booking, 'id'>;

export const useCreateBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booking: NewBooking) => {
      return post('bookings', { ...booking, place: { id: booking.place.id } });
    },

    onMutate: (booking: NewBooking) => {
      const newBooking: Booking = { id: 'temp-id', ...booking };
      const previous = queryClient.getQueryData(['bookings']);
      queryClient.setQueryData(['bookings'], (old: Booking[]) => {
        return [...(old ?? []), newBooking];
      });

      return { previous };
    },

    onError: (_error, _booking, context) => {
      queryClient.setQueryData(['bookings'], context?.previous);
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ['bookings'] }),
  });
};

export const useUpdateBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booking: Booking) => {
      return patchById('bookings', booking.id, {
        ...booking,
        place: { id: booking.place.id },
      });
    },

    onMutate: (booking: Booking) => {
      const previous = queryClient.getQueryData(['bookings']);
      queryClient.setQueryData(['bookings'], (old: Booking[]) => {
        return old.map((oldBooking) => {
          return oldBooking.id === booking.id ? booking : oldBooking;
        });
      });

      return { previous };
    },

    onError: (_error, _booking, context) => {
      queryClient.setQueryData(['bookings'], context?.previous);
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ['bookings'] }),
  });
};

export const useDeleteBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booking: Booking) => {
      return deleteById('bookings', booking.id);
    },

    onMutate: (booking: Booking) => {
      const previous = queryClient.getQueryData(['bookings']);
      queryClient.setQueryData(['bookings'], (old: Booking[]) => {
        return old.filter((oldBooking) => {
          return oldBooking.id !== booking.id;
        });
      });

      return { previous };
    },

    onError: (_error, _booking, context) => {
      queryClient.setQueryData(['bookings'], context?.previous);
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ['bookings'] }),
  });
};
