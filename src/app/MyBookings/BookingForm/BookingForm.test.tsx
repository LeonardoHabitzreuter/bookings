import { render, screen, within } from '@testing-library/react';
import { Wrapper } from '@/tests/helpers/Wrapper';
import { generateBooking, generatePlace } from '@/tests/helpers/factories';
import { BookingForm } from './BookingForm';
import userEvent from '@testing-library/user-event';
import { mockSystemDate } from '@/tests/helpers/date';

mockSystemDate(new Date(2023, 5, 1));

describe('components/BookingForm', () => {
  it('renders form as expected', async () => {
    const booking = generateBooking()

    render(
      <BookingForm
        onClose={() => {}}
        booking={booking}
        otherBookings={[]}
        onSubmit={() => {}}
        submitLabel='Book button'
      />,
      { wrapper: Wrapper }
    );

    const form = screen.getByTestId('booking-form');
    expect(await within(form).findByRole('button', { name: /Book button/ })).toBeInTheDocument();
  });

  it('renders with the correct place info', async () => {
    const place = generatePlace({
      address: 'Mayfair, London',
      description: 'Some description',
    });
    const booking = generateBooking({ place });
    render(
      <BookingForm
        onClose={() => {}}
        booking={booking}
        otherBookings={[]}
        onSubmit={() => {}}
      />,
      { wrapper: Wrapper },
    );
    const address = screen.getByTestId('place-address');
    const description = screen.getByTestId('place-description');
    expect(address).toHaveTextContent(booking.place.address);
    expect(description).toHaveTextContent(booking.place.description);
  });

  it('shows an error message if it has overlaps with another booking', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const place = generatePlace({ address: 'Mayfair, London' });
    const otherBookings = [
      generateBooking({
        place,
        start: new Date(2023, 5, 1),
        end: new Date(2023, 5, 10),
      }),
    ];
    render(
      <BookingForm
        onClose={() => {}}
        booking={{ place }}
        otherBookings={otherBookings}
        onSubmit={onSubmit}
      />,
      { wrapper: Wrapper },
    );

    const dateInput = screen.getByRole('button', {
      name: /Check in - Check out/,
    });
    await user.click(dateInput);
    await user.click(
      screen.getByRole('button', { name: '2 June 2023', hidden: true }),
    );
    await user.click(
      screen.getByRole('button', { name: '10 June 2023', hidden: true }),
    );
    await user.click(
      screen.getByRole('button', { name: 'Book this place', hidden: true }),
    );

    expect(
      await screen.findByText(/There is an overlap with another Booking/),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does not show an error message if it has no overlapping with another booking', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const place = generatePlace({ address: 'Mayfair, London' });
    const currentBookings = [
      generateBooking({
        place,
        start: new Date(2023, 1, 5),
        end: new Date(2023, 1, 10),
      }),
    ];
    render(
      <BookingForm
        onClose={() => {}}
        booking={{ place }}
        otherBookings={currentBookings}
        onSubmit={onSubmit}
      />,
      { wrapper: Wrapper },
    );

    const dateInput = screen.getByRole('button', {
      name: /Check in - Check out/,
    });
    await user.click(dateInput);
    await user.click(
      screen.getByRole('button', { name: '2 June 2023', hidden: true }),
    );
    await user.click(
      screen.getByRole('button', { name: '10 June 2023', hidden: true }),
    );
    await user.click(
      screen.getByRole('button', { name: 'Book this place', hidden: true }),
    );

    expect(
      screen.queryByText(/There is an overlap with another Booking/),
    ).not.toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
