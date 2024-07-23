import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderRoute } from '@/tests/helpers/render';
import { addBookingOnServer } from '@/mocks/handlers';
import { generateBooking, generatePlace } from '@/tests/helpers/factories';
import { mockSystemDate } from '@/tests/helpers/date';

describe('routes/MyBookings/EditBooking', () => {
  const place = generatePlace({ address: 'Mayfair, London' })
  mockSystemDate(new Date(2023, 5, 1));

  beforeEach(() => {
    addBookingOnServer(
      generateBooking({
        place,
        id: '1',
        start: new Date(2023, 5, 8),
        end: new Date(2023, 5, 15),
      }),
    );
  });

  it('renders Edit Booking route', async () => {
    renderRoute({ path: '/bookings/edit/1' });
    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent(/Mayfair, London/);
  });

  it('renders modal with the correct place info', async () => {
    renderRoute({ path: '/bookings/edit/1' });
    const modal = await screen.findByRole('dialog');
    const address = within(modal).getByTestId('place-address');
    const description = within(modal).getByTestId('place-description');
    expect(address).toHaveTextContent(place.address);
    expect(description).toHaveTextContent(place.description);
  });

  it('should correctly edit a booking', async () => {
    const user = userEvent.setup();
    renderRoute({ path: '/bookings/edit/1' });
    const modal = await screen.findByRole('dialog');
    const dateInput = within(modal).getByRole('button', {
      name: /June 8, 2023 – June 15, 2023/,
    });
    await user.click(dateInput);
    await user.click(
      screen.getByRole('button', { name: '2 June 2023', hidden: true }),
    );
    await user.click(
      screen.getByRole('button', { name: '10 June 2023', hidden: true }),
    );
    await user.click(
      screen.getByRole('button', { name: 'Update Booking', hidden: true }),
    );
    const card = within(await screen.findByTestId('booking-card'));
    expect(card.getByText(/Westminster, London/)).toBeInTheDocument();
    expect(card.getByText(/June 2, 2023/)).toBeInTheDocument();
    expect(card.getByText(/June 10, 2023/)).toBeInTheDocument();
  });
});
