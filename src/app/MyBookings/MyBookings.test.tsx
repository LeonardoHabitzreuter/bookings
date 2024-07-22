import { screen } from '@testing-library/react';
import { renderRoute } from '@/tests/helpers/render';
import { addBookingOnServer } from '@/mocks/handlers';
import { generateBooking } from '@/tests/helpers/factories';

describe('routes/MyBookings', () => {
  it('renders My Bookings route', async () => {
    renderRoute({ path: '/bookings' });
    expect(await screen.findByTestId('bookings-content')).toBeInTheDocument();
  });

  it('renders cards of bookings', async () => {
    addBookingOnServer(generateBooking({ id: '1' }));
    addBookingOnServer(generateBooking({ id: '2' }));
    addBookingOnServer(generateBooking({ id: '3' }));
    renderRoute({ path: '/bookings' });
    await screen.findByTestId('bookings-content');
    const cards = screen.getAllByTestId('booking-card');
    expect(cards).toHaveLength(3);
  });
});
