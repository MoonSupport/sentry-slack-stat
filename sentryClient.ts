import { Axios } from 'axios';
import qs from 'qs';

import { SENTRY_STATICS_API_TOKEN } from './config';

const axios = new Axios({
  baseURL: 'https://sentry.io',
  headers: {
    Authorization: `Bearer ${SENTRY_STATICS_API_TOKEN}`,
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
  transformResponse: (res) => JSON.parse(res),
});

export const getErrorEventsByProjectAndOutcome = async (
  start: Date,
  end: Date,
) => {
  const res = await axios.get(`/api/0/organizations/org_name/stats_v2/`, {
    params: {
      category: 'error',
      field: 'sum(quantity)',
      groupBy: ['outcome', 'project'],
      interval: '1h',
      project: '-1',
      start,
      end,
      utc: false,
    },
  });

  return res.data;
};

/**
 * Date는 UTC 포맷으로 받음
 * Sentry Client에서 UTC -> KST 변경을 하기 때문에, UTC 그대로 요청해야 원하는 값이 나옴.
 *
 * Sentry Client의 Timezone은 Sentry Setting을 바탕으로 결정 됨.
 *
 * 2023-03-27일 00시부터 23:59분 까지의 자료를 얻어야 한다면
 * 2023-03-26T:15:00:00 ~ 2023-03-27T:14:59:59 이어야 함.
 */
export const getErrorEventsByCateogryAndOutcome = async (
  start: Date,
  end: Date,
) => {
  const res = await axios.get(`/api/0/organizations/org_name/stats_v2/`, {
    params: {
      category: 'error',
      outcome: 'accepted',
      field: 'sum(quantity)',
      groupBy: ['outcome', 'category'],
      interval: '1h',
      project: '-1',
      start,
      end,
      utc: false,
    },
  });

  return res.data;
};

export const getProjects = async () => {
  const res = await axios.get(`/api/0/projects/`);
  return res.data;
};

export const getSubscripton = async () => {
  const res = await axios.get(`/api/0/subscriptions/org_name/`);
  return res.data;
};
