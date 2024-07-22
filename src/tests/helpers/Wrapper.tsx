import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { buildQueryClient } from '@/tests/helpers/query';
import { BrowserRouter } from 'react-router-dom';

interface WrapperProps {
  queryClient?: QueryClient;
  children: React.ReactNode;
}

export const BaseWrapper = ({ queryClient, children }: WrapperProps) => {
  return (
    <QueryClientProvider client={queryClient ?? buildQueryClient()}>
      <MantineProvider>{children}</MantineProvider>
    </QueryClientProvider>
  );
};

export const Wrapper = ({ queryClient, children }: WrapperProps) => {
  return (
    <BaseWrapper queryClient={queryClient ?? buildQueryClient()}>
      <BrowserRouter>{children}</BrowserRouter>
    </BaseWrapper>
  );
};
