import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const rootLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname === '/') return redirect('/places');
  return null;
};
