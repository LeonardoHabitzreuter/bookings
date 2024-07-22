import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export const Root = () => (
  <div className="flex flex-col h-full">
    <Header />

    <main
      className="w-full flex-grow sm:bg-repeat-round p-4"
      style={{ backgroundImage: "url('/booking-bg.jpg')" }}
    >
      <div className="max-w-[1320px] mx-auto">
        <Outlet />
      </div>
    </main>
  </div>
);
