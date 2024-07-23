import { http, HttpResponse } from 'msw';
import { Booking } from '@/models/Booking';
import { Place } from '@/models/Place';
import { Optional } from '@/utils/types';

const allBookings = new Map<string, Booking>();

const allPlaces = new Map<string, Place>([
  [
    '1',
    {
      id: '1',
      address: 'Westminster, London',
      description: `Stay at The Westminster Retreat, a beautifully restored Victorian townhouse with elegant decor and a private courtyard garden, just minutes from iconic landmarks like Big Ben and the Thames River. Enjoy luxurious living in the heart of historic London.`,
      imageUrl: '/Westminster.jpg',
    },
  ],
  [
    '2',
    {
      id: '2',
      address: 'Mayfair, London',
      description: `The Mayfair Residence is a luxurious townhouse with elegant interiors and a private rooftop terrace, situated in the heart of London's prestigious Mayfair district. Experience refined living with easy access to upscale shops, fine dining, and historic landmarks.`,
      imageUrl: '/Mayfair.jpg',
    },
  ],
  [
    '3',
    {
      id: '3',
      address: 'Canary Wharf, London',
      description: `The Wharfside Retreat is a contemporary house in Canary Wharf, offering sleek, modern interiors and stunning river views. Enjoy luxurious amenities and easy access to London's financial district and vibrant Docklands.`,
      imageUrl: '/CanaryWharf.jpg',
    },
  ],
  [
    '4',
    {
      id: '4',
      address: 'Southwark, London',
      description: `The Southwark Retreat is a beautifully restored Victorian house offering spacious rooms and a serene courtyard garden, located minutes from the vibrant Borough Market and the Tate Modern. Enjoy contemporary amenities in a historic setting perfect for exploring South London.`,
      imageUrl: '/Southwark.jpg',
    },
  ],
]);

const BASE_URL = 'http://localhost:5173/api';

export const addBookingOnServer = (booking: Optional<Booking, 'id'>) => {
  const id = booking.id ?? `${Array.from(allBookings.values()).length + 1}`;
  allBookings.set(id, { ...booking, id });
  return allBookings.get(id) as Booking;
};

export const getServerItem = (itemType: 'booking' | 'place', id: string) => {
  switch (itemType) {
    case 'booking':
      return allBookings.get(id);
    case 'place':
      return allPlaces.get(id);
  }
};

export const clearServer = () => {
  allBookings.clear();
};

export const handlers = [
  // Bookings
  http.get(`${BASE_URL}/bookings`, () => {
    return HttpResponse.json(Array.from(allBookings.values()));
  }),

  http.get(`${BASE_URL}/bookings/:id`, ({ params }) => {
    const booking = allBookings.get(params.id as string);
    if (!booking) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(booking);
  }),

  http.delete(`${BASE_URL}/bookings/:id`, ({ params }) => {
    const booking = allBookings.get(params.id as string);
    if (!booking) return new HttpResponse(null, { status: 404 });
    allBookings.delete(booking.id);
    return HttpResponse.json(booking);
  }),

  http.patch(`${BASE_URL}/bookings/:id`, async ({ request, params }) => {
    const id = params.id as string;
    const body = (await request.json()) as Booking;
    const booking = { ...body, place: allPlaces.get(body.place.id)! };
    allBookings.set(id, booking);
    return HttpResponse.json(allBookings.get(id));
  }),

  http.post(`${BASE_URL}/bookings`, async ({ request }) => {
    const body = (await request.json()) as Omit<Booking, 'id'>;
    const booking = { ...body, place: allPlaces.get(body.place.id)! };
    return HttpResponse.json(addBookingOnServer(booking), { status: 201 });
  }),

  // Places
  http.get(`${BASE_URL}/places`, () => {
    return HttpResponse.json(Array.from(allPlaces.values()));
  }),

  http.get(`${BASE_URL}/places/:id`, ({ params }) => {
    const place = allPlaces.get(params.id as string);
    if (!place) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(place);
  }),
];
