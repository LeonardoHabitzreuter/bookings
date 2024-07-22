import { render, screen } from '@testing-library/react';
import { Wrapper } from '@/tests/helpers/Wrapper';
import { generateBooking, generatePlace } from '@/tests/helpers/factories';
import { BookingForm } from '@/components/BookingForm';
import userEvent from '@testing-library/user-event';

describe('components/BookingForm', () => {
  it('renders form as expected', async () => {
    render(
      <BookingForm
        booking={generateBooking()}
        otherBookings={[]}
        onSubmit={() => {}}
      />,
      { wrapper: Wrapper },
    );
    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent(/Choose the dates you will stay at:/);
  });

  it('renders with the correct place info', async () => {
    const place = generatePlace({
      address: 'Tokyo, Japan',
      description: 'Some description',
    });
    const booking = generateBooking({ place });
    render(
      <BookingForm booking={booking} otherBookings={[]} onSubmit={() => {}} />,
      { wrapper: Wrapper },
    );
    const placeInfo = await screen.findByTestId('place-info');
    expect(placeInfo).toHaveTextContent(place.address);
    expect(placeInfo).toHaveTextContent(place.description);
  });

  it('shows an error message if it has overlaps with another booking', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const place = generatePlace({ address: 'Tokyo, Japan' });
    const booking = generateBooking({
      place,
      start: new Date(2023, 0, 1),
      end: new Date(2023, 0, 8),
    });
    const otherBookings = [
      generateBooking({
        place,
        start: new Date(2023, 0, 5),
        end: new Date(2023, 0, 10),
      }),
    ];
    render(
      <BookingForm
        booking={booking}
        otherBookings={otherBookings}
        onSubmit={onSubmit}
      />,
      { wrapper: Wrapper },
    );
    await user.click(screen.getByRole('button', { name: /Book this place/ }));
    expect(
      screen.getByText(/There is an overlap with another Booking/),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does not show an error message if it has no overlapping with another booking', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const place = generatePlace({ address: 'Tokyo, Japan' });
    const booking = generateBooking({
      place,
      start: new Date(2023, 0, 1),
      end: new Date(2023, 0, 8),
    });
    const otherBookings = [
      generateBooking({
        place,
        start: new Date(2023, 1, 5),
        end: new Date(2023, 1, 10),
      }),
    ];
    render(
      <BookingForm
        booking={booking}
        otherBookings={otherBookings}
        onSubmit={onSubmit}
      />,
      { wrapper: Wrapper },
    );
    await user.click(screen.getByRole('button', { name: /Book this place/ }));
    expect(
      screen.queryByText(/There is an overlap with another Booking/),
    ).not.toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
