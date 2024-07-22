import { render, screen } from '@testing-library/react';
import { PlaceCard } from './PlaceCard';
import { Wrapper } from '@/tests/helpers/Wrapper';
import { generatePlace } from '@/tests/helpers/factories';

describe('components/PlaceCard', () => {
  it('renders card as expected', () => {
    render(<PlaceCard place={generatePlace()} />, { wrapper: Wrapper });
    expect(screen.getByTestId('place-card')).toBeInTheDocument();
  });

  it('renders card with correct image', () => {
    const place = generatePlace({ imageUrl: 'www.example.com' });
    render(<PlaceCard place={place} />, { wrapper: Wrapper });
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', place.imageUrl);
  });

  it('renders card with correct address', () => {
    const place = generatePlace({ address: 'Mayfair, London' });
    render(<PlaceCard place={place} />, { wrapper: Wrapper });
    expect(screen.getByText(place.address)).toBeInTheDocument();
  });

  it('renders card with correct description', () => {
    const place = generatePlace({ description: 'Some description' });
    render(<PlaceCard place={place} />, { wrapper: Wrapper });
    expect(screen.getByText(place.description)).toBeInTheDocument();
  });

  it('renders card with book place button', () => {
    render(<PlaceCard place={generatePlace()} />, { wrapper: Wrapper });
    const button = screen.getByRole('link', { name: /Book/ });
    expect(button).toBeInTheDocument();
  });
});
