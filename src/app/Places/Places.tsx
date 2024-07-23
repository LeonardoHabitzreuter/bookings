import { useLoaderData } from 'react-router-dom';
import { PlaceCard } from './PlaceCard';
import { usePlacesQuery } from '@/queries/places';
import { Place } from '@/models/Place';
import { ListContainer } from '@/components/ui';

export const Places = () => {
  const [initialPlacesData] = useLoaderData() as [Place[]];
  const { data: places } = usePlacesQuery({ initialData: initialPlacesData });

  return (
    <ListContainer data-testid="places-content">
      {places?.map((place) => <PlaceCard key={place.id} place={place} />)}
    </ListContainer>
  );
};
