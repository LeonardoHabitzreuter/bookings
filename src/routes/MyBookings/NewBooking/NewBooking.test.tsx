import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockSystemDate } from '@/tests/helpers/date';
import { renderRoute } from '@/tests/helpers/render';
import { getServerItem } from '@/mocks/handlers';
import { Place } from '@/models/Place';

describe('routes/MyBookings/NewBooking', () => {
  mockSystemDate(new Date(2023, 5, 1));

  it('renders New Booking route', async () => {
    renderRoute({ path: '/bookings/new/3' });
    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent(/Choose the dates you will stay at:/);
  });

  it('renders modal with the correct place info', async () => {
    renderRoute({ path: '/bookings/new/3' });
    const modal = await screen.findByRole('dialog');
    const placeInfo = within(modal).getByTestId('place-info');
    const place = getServerItem('place', '3') as Place;
    expect(placeInfo).toHaveTextContent(place.address);
    expect(placeInfo).toHaveTextContent(place.description);
  });

  it('should correctly add a booking', async () => {
    const user = userEvent.setup();
    renderRoute({ path: '/bookings/new/3' });
    const modal = await screen.findByRole('dialog');
    const dateInput = within(modal).getByRole('button', {
      name: /Check-in - Checkout/,
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
    const card = within(await screen.findByTestId('booking-card'));
    expect(card.getByText(/Canary Wharf, London/)).toBeInTheDocument();
    expect(card.getByText(/June 2, 2023/)).toBeInTheDocument();
    expect(card.getByText(/June 10, 2023/)).toBeInTheDocument();
  });
});
