import dayjs from 'dayjs';

import { getSubscripton } from '../sentryClient';
import Subscribe from '../vo/Subscribe';

const getRemainingDateText = async () => {
  const rawSubscribe = await getSubscripton();
  const subscribe = new Subscribe(rawSubscribe);
  const day = dayjs();

  const intervalPast = day.diff(dayjs(subscribe.billingPeriodStart), 'day');
  const intervalNext = dayjs(subscribe.billingPeriodEnd)
    .add(1, 'day')
    .diff(day, 'day');

  return `구독 갱신으로부터 *${intervalPast}일* 지났습니다. \n 다음 갱신까지는 *${intervalNext}일* 남았습니다.`;
};

export default getRemainingDateText;
