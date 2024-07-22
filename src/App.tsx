import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routerBuilder } from '@/config/router';

const queryClient = new QueryClient();

export const App = () => {
  const router = useMemo(() => {
    return createBrowserRouter(routerBuilder(queryClient));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
};
