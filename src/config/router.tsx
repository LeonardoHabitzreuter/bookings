import { QueryClient } from '@tanstack/react-query';
import { MyBookings, myBookingsLoader } from '@/routes/MyBookings';
import { NewBooking, newBookingLoader } from '@/routes/MyBookings/NewBooking';
import {
  DeleteBooking,
  deleteBookingLoader,
} from '@/routes/MyBookings/DeleteBooking';
import {
  EditBooking,
  editBookingLoader,
} from '@/routes/MyBookings/EditBooking';
import { Places, placesLoader } from '@/routes/Places';
import { Root, rootLoader } from '@/routes';
import { RouteObject } from 'react-router-dom';

export const routerBuilder = (queryClient: QueryClient) =>
  [
    {
      path: '/',
      element: <Root />,
      loader: rootLoader,
      children: [
        {
          path: 'places',
          element: <Places />,
          loader: placesLoader(queryClient),
        },
        {
          path: 'bookings',
          element: <MyBookings />,
          loader: myBookingsLoader(queryClient),
          children: [
            {
              path: 'new/:placeId',
              element: <NewBooking />,
              loader: newBookingLoader(queryClient),
            },
            {
              path: 'edit/:bookingId',
              element: <EditBooking />,
              loader: editBookingLoader(queryClient),
            },
            {
              path: 'delete/:bookingId',
              element: <DeleteBooking />,
              loader: deleteBookingLoader(queryClient),
            },
          ],
        },
      ],
    },
  ] as RouteObject[];
