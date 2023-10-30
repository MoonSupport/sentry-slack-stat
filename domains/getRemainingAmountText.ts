import { getSubscripton } from '../sentryClient';
import Subscribe from '../vo/Subscribe';

const getRemainingAmountText = async () => {
  const rawSubscribe = await getSubscripton();
  const subscribe = new Subscribe(rawSubscribe);

  const { reserved } = subscribe.categories.errors;
  const { usage } = subscribe.categories.errors;
  const remain = reserved - usage;

  const usagePercent = ((usage / reserved) * 100).toFixed(2);
  const remainPercent = ((remain / reserved) * 100).toFixed(2);

  return `*전체 사용량* : ${usage.toLocaleString()} ( ${usagePercent}% ) \n *남은 사용량* : ${remain.toLocaleString()} ( ${remainPercent}% )`;
};

export default getRemainingAmountText;
