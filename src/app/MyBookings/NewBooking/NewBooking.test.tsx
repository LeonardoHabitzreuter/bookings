import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockSystemDate } from '@/tests/helpers/date';
import { generatePlace } from '@/tests/helpers/factories';
import { NewBooking } from './NewBooking';
import { Wrapper } from '@/tests/helpers/Wrapper';
import { renderRoute } from '@/tests/helpers/render';
import { Place } from '@/models/Place';
import { getServerItem } from '@/mocks/handlers';

describe('components/NewBooking', () => {
  const place = generatePlace()
  mockSystemDate(new Date(2023, 5, 1));

  it('renders modal with the correct place info', async () => {
    render(
      <NewBooking onClose={() => {}} place={place}/>,
      { wrapper: Wrapper }
    );
    
    const modal = screen.getByRole('dialog');
    const address = within(modal).getByTestId('place-address');
    const description = within(modal).getByTestId('place-description');
    expect(address).toHaveTextContent(place.address);
    expect(description).toHaveTextContent(place.description);
  });

  it('should correctly add a booking', async () => {
    const user = userEvent.setup();

    renderRoute({ path: '/places' });

    await screen.findByTestId('places-content');
    const firstCard = screen.getAllByTestId('place-card')[0];
    const bookButton = within(firstCard).getByRole('button', { name: /Book/ })
    await user.click(bookButton);

    const modal = await screen.findByRole('dialog');
    const dateInput = within(modal).getByRole('button', {
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
    const card = within(await screen.findByTestId('booking-card'));
    const place = getServerItem('place', '1') as Place;
    expect(card.getByText(place.address)).toBeInTheDocument();
    expect(card.getByText(/June 2, 2023/)).toBeInTheDocument();
    expect(card.getByText(/June 10, 2023/)).toBeInTheDocument();
  });
});
