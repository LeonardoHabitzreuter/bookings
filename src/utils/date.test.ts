import { isOverlapping } from '@/utils/date';

describe('utils/date', () => {
  describe('isOverlapping', () => {
    it.each([
      [
        { start: new Date(2023, 0, 1), end: new Date(2023, 0, 15) },
        { start: new Date(2023, 0, 10), end: new Date(2023, 0, 20) },
        true,
      ],
      [
        { start: new Date(2023, 0, 10), end: new Date(2023, 0, 25) },
        { start: new Date(2023, 0, 5), end: new Date(2023, 0, 20) },
        true,
      ],
      [
        { start: new Date(2023, 0, 1), end: new Date(2023, 0, 25) },
        { start: new Date(2023, 0, 5), end: new Date(2023, 0, 15) },
        true,
      ],
      [
        { start: new Date(2023, 0, 1), end: new Date(2023, 0, 25) },
        { start: new Date(2023, 0, 1), end: new Date(2023, 0, 25) },
        true,
      ],
      [
        { start: new Date(2023, 0, 1), end: new Date(2023, 0, 25) },
        { start: new Date(2023, 1, 1), end: new Date(2023, 1, 25) },
        false,
      ],
    ])(
      'should correctly tell if ranges are overlapping',
      (rangeA, rangeB, expected) => {
        expect(isOverlapping(rangeA, rangeB)).toBe(expected);
      },
    );
  });
});
