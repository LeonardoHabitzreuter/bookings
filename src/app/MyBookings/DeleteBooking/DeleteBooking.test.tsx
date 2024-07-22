import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderRoute } from '@/tests/helpers/render';
import { addBookingOnServer } from '@/mocks/handlers';
import { generateBooking, generatePlace } from '@/tests/helpers/factories';

describe('routes/MyBookings/DeleteBooking', () => {
  beforeEach(() => {
    addBookingOnServer(
      generateBooking({
        id: '1',
        start: new Date(2023, 5, 8),
        end: new Date(2023, 5, 15),
        place: generatePlace({ address: 'Recife, Brazil' }),
      }),
    );
  });

  it('renders Delete Booking route', async () => {
    renderRoute({ path: '/bookings/delete/1' });
    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent(
      /Are you sure you want to delete your reservation at Recife, Brazil/,
    );
  });

  it('should correctly delete a booking', async () => {
    const user = userEvent.setup();
    renderRoute({ path: '/bookings/delete/1' });
    const modal = await screen.findByRole('dialog');
    const deleteButton = within(modal).getByRole('button', {
      name: /Delete Booking/,
    });
    await user.click(deleteButton);
    const cards = screen.queryAllByTestId('booking-card');
    expect(cards).toHaveLength(0);
  });
});
