import { Booking } from '@/models/Booking';
import { Place } from '@/models/Place';
import { RecursivePartial } from '@/utils/type';

const baseUrl =
  import.meta.env.MODE === 'test' ? 'http://localhost:5173/api/' : '/api/';

type Models = {
  places: Place;
  bookings: Booking;
};

export const getAll = async <K extends keyof Models, M extends Models[K]>(
  pluralizedModel: K,
) => {
  const response = await fetch(`${baseUrl}${pluralizedModel}`);
  return response.json() as Promise<M[]>;
};

export const getById = async <K extends keyof Models, M extends Models[K]>(
  pluralizedModel: K,
  id: string,
) => {
  const response = await fetch(`${baseUrl}${pluralizedModel}/${id}`);
  return response.json() as Promise<M>;
};

export const post = async <K extends keyof Models, M extends Models[K]>(
  pluralizedModel: K,
  body: RecursivePartial<M>,
) => {
  const response = await fetch(`${baseUrl}${pluralizedModel}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return response.json() as Promise<M>;
};

export const patchById = async <K extends keyof Models, M extends Models[K]>(
  pluralizedModel: K,
  id: string,
  body: RecursivePartial<M>,
) => {
  const response = await fetch(`${baseUrl}${pluralizedModel}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  return response.json() as Promise<M>;
};

export const deleteById = async <K extends keyof Models, M extends Models[K]>(
  pluralizedModel: K,
  id: string,
) => {
  const response = await fetch(`${baseUrl}${pluralizedModel}/${id}`, {
    method: 'DELETE',
  });
  return response.json() as Promise<M>;
};
