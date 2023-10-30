import dayjs from 'dayjs';

export function getYesterDayStartAndEnd() {
  const today = dayjs();
  const yesterday0000 = today.subtract(1, 'day').startOf('day');
  const yesterday2359 = today
    .subtract(1, 'day')
    .endOf('day')
    .subtract(999, 'second');
  return [yesterday0000.toDate(), yesterday2359.toDate()];
}
