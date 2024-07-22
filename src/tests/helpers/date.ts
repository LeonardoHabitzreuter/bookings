export const mockSystemDate = (date: Date) => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(date);
  });

  afterEach(() => {
    vi.useRealTimers();
  });
};
