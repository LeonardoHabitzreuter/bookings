import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderRoute } from '@/tests/helpers/render';

describe('routes/Root', () => {
  it('renders Root route', async () => {
    renderRoute({ path: '/' });
    expect(await screen.findByTestId('places-content')).toBeInTheDocument();
  });

  it('should go to My Bookings route when clicking on my bookings button', async () => {
    const user = userEvent.setup();
    renderRoute({ path: '/' });
    await user.click(await screen.findByTestId('my-bookings'));
    expect(await screen.findByTestId('bookings-content')).toBeInTheDocument();
  });

  it('should go to Places route when clicking on logo', async () => {
    const user = userEvent.setup();
    renderRoute({ path: '/' });
    await user.click(await screen.findByTestId('bookings-logo'));
    expect(await screen.findByTestId('places-content')).toBeInTheDocument();
  });
});
