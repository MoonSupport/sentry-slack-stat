import { WebClient } from '@slack/web-api';
import { BlockCollection, Blocks, Elements, Header } from 'slack-block-builder';

import { SENTRY_STATICS_PAGE, SLACK_TOKEN } from './config';
import getDailyAmoutByProjectText from './domains/getDailyAmoutByProjectText';
import getDailyErrorAccpectedChartURL from './domains/getDailyErrorAccpectedChartURL';
import getRemainingAmountText from './domains/getRemainingAmountText';
import getRemainingDateText from './domains/getRemainingDateText';

(async () => {
  const client = new WebClient(SLACK_TOKEN);

  const [
    remainingDateText,
    remainingAmountText,
    chartImageURL,
    dailyAmoutByProject,
  ] = await Promise.all([
    getRemainingDateText(),
    getRemainingAmountText(),
    getDailyErrorAccpectedChartURL(),
    getDailyAmoutByProjectText(),
  ]);

  const reportDay = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  client.chat.postMessage({
    channel: '#general',
    text: `${reportDay} Sentry Report`,
    blocks: BlockCollection(
      Header({ text: ':newspaper:  DAILY SENTRY QUOTA REPORT  :newspaper:' }),
      Blocks.Context().elements(`*${reportDay}*  |  Sales Team Announcements`),
      Blocks.Section({
        text: `:loud_sound: *남은 사용량* :loud_sound:`,
      }).accessory(
        Elements.Button({ text: 'Watch Now', url: SENTRY_STATICS_PAGE }),
      ),
      Blocks.Section({ text: remainingDateText }),
      Blocks.Section({ text: remainingAmountText }),
      Blocks.Section({ text: '🎃 *24시간 Error Accpected* 🎃' }),
      Blocks.Image({
        title: '시간 당 Accpected Amount',
        imageUrl: chartImageURL,
        altText: 'chart',
      }),
      Blocks.Divider(),
      Blocks.Section({ text: '🍊 *어플리케이션 별 하루 사용량* 🍊' }),
      Blocks.Section({ text: dailyAmoutByProject }),
    ),
  });
})();
