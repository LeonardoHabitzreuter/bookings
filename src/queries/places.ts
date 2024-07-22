import { getAll, getById } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';

export const placesQuery = ({ ...params } = {}) => ({
  queryKey: ['places'],
  queryFn: () => getAll('places'),
  staleTime: 30 * 1000,
  ...params,
});

export const placeByIdQuery = (id: string, { ...params } = {}) => ({
  queryKey: ['places', id],
  queryFn: () => getById('places', id),
  staleTime: 30 * 1000,
  ...params,
});

export const usePlacesQuery = ({ ...params } = {}) => {
  return useQuery(placesQuery(params));
};

export const usePlaceById = (id: string, { ...params } = {}) => {
  return useQuery(placeByIdQuery(id, params));
};
