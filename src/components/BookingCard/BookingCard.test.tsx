import { render, screen } from '@testing-library/react';
import { BookingCard } from '@/components/BookingCard';
import { Wrapper } from '@/tests/helpers/Wrapper';
import { generateBooking, generatePlace } from '@/tests/helpers/factories';

describe('components/BookingCard', () => {
  it('renders card as expected', () => {
    render(<BookingCard booking={generateBooking()} />, { wrapper: Wrapper });
    expect(screen.getByTestId('booking-card')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Edit/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Delete/ })).toBeInTheDocument();
  });

  it('renders card with correct image', () => {
    const place = generatePlace({ imageUrl: 'www.example.com' });
    const booking = generateBooking({ place });
    render(<BookingCard booking={booking} />, { wrapper: Wrapper });
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', place.imageUrl);
  });

  it('renders card with correct address', () => {
    const place = generatePlace({ address: 'Tokyo, Japan' });
    const booking = generateBooking({ place });
    render(<BookingCard booking={booking} />, { wrapper: Wrapper });
    expect(screen.getByText(place.address)).toBeInTheDocument();
  });

  it('renders card with correct dates', () => {
    const place = generatePlace({ address: 'Tokyo, Japan' });
    const booking = generateBooking({
      place,
      start: new Date(2023, 0, 1),
      end: new Date(2023, 0, 10),
    });
    render(<BookingCard booking={booking} />, { wrapper: Wrapper });
    expect(screen.getByText(/Check-in/)).toBeInTheDocument();
    expect(screen.getByText(/January 1, 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Checkout/)).toBeInTheDocument();
    expect(screen.getByText(/January 10, 2023/)).toBeInTheDocument();
  });
});
