import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderRoute } from '@/tests/helpers/render';

describe('routes/Places', () => {
  it('renders Places route', async () => {
    renderRoute({ path: '/places' });
    expect(await screen.findByTestId('places-content')).toBeInTheDocument();
  });

  it('renders cards of places', async () => {
    renderRoute({ path: '/places' });
    await screen.findByTestId('places-content');
    const cards = screen.getAllByTestId('place-card');
    expect(cards).toHaveLength(4);
  });

  it('opens new booking modal', async () => {
    const user = userEvent.setup();
    renderRoute({ path: '/places' });

    await screen.findByTestId('places-content');
    const firstCard = screen.getAllByTestId('place-card')[0];
    const bookButton = within(firstCard).getByRole('button', { name: /Book/ })
    await user.click(bookButton);
    const modal = screen.getByRole('dialog')
    
    expect(await within(modal).findByTestId('booking-form')).toBeInTheDocument();
  });
});
