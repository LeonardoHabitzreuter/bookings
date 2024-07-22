import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { routerBuilder } from '@/config/router';
import { BaseWrapper } from '@/tests/helpers/Wrapper';
import { buildQueryClient } from '@/tests/helpers/query';

export const renderRoute = ({ path } = { path: '/' }) => {
  const queryClient = buildQueryClient();
  const router = createMemoryRouter(routerBuilder(queryClient), {
    initialEntries: [path],
  });

  return render(
    <BaseWrapper queryClient={queryClient}>
      <RouterProvider router={router} />
    </BaseWrapper>,
  );
};
