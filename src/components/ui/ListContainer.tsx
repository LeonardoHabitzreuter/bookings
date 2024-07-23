import { ReactNode } from "react";

export default function ListContainer ({ children }: { children: ReactNode }) {
  return (
    <section
      data-testid="places-content"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 sm:my-9 px-4 py-5 sm:px-10 sm:py-6 rounded-3xl gap-4 xl:gap-5"
      style={{
        background: 'rgba(255, 255, 255, 0.10)',
        boxShadow:
          '0px 18.262px 22.827px 0px rgba(0, 0, 0, 0.05), 0px 0.761px 6.087px 0px rgba(255, 255, 255, 0.35) inset, -0.761px 0.761px 0.761px -1.522px rgba(255, 255, 255, 0.35) inset',
        backdropFilter: 'blur(74.56938171386719px)',
      }}
    >
      {children}
    </section>
  )
}