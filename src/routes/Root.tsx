import { Link, Outlet } from 'react-router-dom';

export const Root = () => (
  <div className="flex flex-col h-full">
    <header className="flex justify-center sticky top-0 z-10 p-6 bg-white">
      <div className="w-full max-w-[1320px] flex justify-between">
        <Link to="/places">
          <img
            data-testid="bookings-logo"
            alt="logo"
            width={119}
            height={34}
            src="/logo.svg"
          />
        </Link>
        <Link
          className="flex items-center justify-center w-[176px] gap-4 rounded-3xl border-[#DCDCDC] border-2 text-sm font-semibold"
          data-testid="my-bookings"
          to="/bookings"
        >
          <img width={17} height={13} src="/ticket.svg" />
          My bookings
        </Link>
      </div>
    </header>
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
