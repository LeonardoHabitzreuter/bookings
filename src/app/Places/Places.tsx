import { useLoaderData } from 'react-router-dom';
import { Grid } from '@mantine/core';
import { PlaceCard } from './PlaceCard';
import { usePlacesQuery } from '@/queries/places';
import { Place } from '@/models/Place';

export const Places = () => {
  const [initialPlacesData] = useLoaderData() as [Place[]];
  const { data: places } = usePlacesQuery({ initialData: initialPlacesData });

  return (
    <section
      className="sm:my-9 px-4 py-5 sm:px-10 sm:py-6 rounded-3xl"
      style={{
        background: 'rgba(255, 255, 255, 0.10)',
        boxShadow:
          '0px 18.262px 22.827px 0px rgba(0, 0, 0, 0.05), 0px 0.761px 6.087px 0px rgba(255, 255, 255, 0.35) inset, -0.761px 0.761px 0.761px -1.522px rgba(255, 255, 255, 0.35) inset',
        backdropFilter: 'blur(74.56938171386719px)',
      }}
    >
      <Grid data-testid="places-content" p="md">
        {places?.map((place) => (
          <Grid.Col key={place.id} span={{ base: 12, sm: 6, xl: 4 }}>
            <PlaceCard place={place} />
          </Grid.Col>
        ))}
      </Grid>
    </section>
  );
};
