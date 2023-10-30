import dayjs from 'dayjs';

import generateQuickChartURL from '../../util/generateQuickChartURL';
import { getYesterDayStartAndEnd } from '../../util/getYesterDayStartAndEnd';
import { getErrorEventsByCateogryAndOutcome } from '../sentryClient';
import TotalQuantityGroupByOutcomeAndCateogry from '../vo/TotalQuantityGroupByOutcomeAndProject copy';

const getDailyErrorAccpectedChartURL = async () => {
  const [yesterday0000, yesterday2359] = getYesterDayStartAndEnd();
  const rawErrorEventsByCateogryAndOutcome =
    await getErrorEventsByCateogryAndOutcome(yesterday0000, yesterday2359);

  const errorEventsByCateogryAndOutcome =
    new TotalQuantityGroupByOutcomeAndCateogry(
      rawErrorEventsByCateogryAndOutcome,
    );
  const intervalHours = errorEventsByCateogryAndOutcome.intervals.map(
    (interval: string) => dayjs(interval).format('HH:mm'),
  );

  return generateQuickChartURL({
    type: 'bar',
    data: {
      labels: intervalHours,
      datasets: [
        {
          type: 'bar',
          label: 'AccpectedAmount(Error)',
          borderColor: 'rgb(54,162,235)',
          borderWidth: 2,
          fill: false,
          data: errorEventsByCateogryAndOutcome.series['sum(quantity)'],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: yesterday0000.toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        }),
      },
    },
  });
};

export default getDailyErrorAccpectedChartURL;
