import { QueryClient } from '@tanstack/react-query';

export const buildQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
