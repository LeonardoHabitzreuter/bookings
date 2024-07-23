import { QueryClient } from '@tanstack/react-query';
import { MyBookings, myBookingsLoader } from '@/app/MyBookings';
import { Places, placesLoader } from '@/app/Places';
import { Root } from '@/app/Root';
import { RouteObject } from 'react-router-dom';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { DeleteBooking, deleteBookingLoader} from '@/app/MyBookings/DeleteBooking';
import { EditBooking, editBookingLoader } from '@/app/MyBookings/EditBooking';

const rootLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname === '/') return redirect('/places');
  return null;
};

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
