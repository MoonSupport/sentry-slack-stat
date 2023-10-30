import { groupBy } from '../../util/groupBy';
import type { TotalQuantityGroupByOutcomeAndProject } from '../parseErrorEventGroupByProject';
import {
  mergeProjectAndErrorEvent,
  parseErrorEventGroupByProject,
} from '../parseErrorEventGroupByProject';

describe('[parseErrorEventGroupByProject]', () => {
  const projects = [
    {
      id: 1,
      slug: 'test1',
    },
    {
      id: 2,
      slug: 'test2',
    },
    {
      id: 3,
      slug: 'test3',
    },
  ];

  const groups: TotalQuantityGroupByOutcomeAndProject[] = [
    {
      by: {
        outcome: 'accepted',
        project: 1,
      },
      totals: {
        'sum(quantity)': 1,
      },
    },
    {
      by: {
        outcome: 'accepted',
        project: 2,
      },
      totals: {
        'sum(quantity)': 2,
      },
    },
    {
      by: {
        outcome: 'rate_limited',
        project: 2,
      },
      totals: {
        'sum(quantity)': 2,
      },
    },
    {
      by: {
        outcome: 'accepted',
        project: 3,
      },
      totals: {
        'sum(quantity)': 3,
      },
    },
    {
      by: {
        outcome: 'client_discard',
        project: 3,
      },
      totals: {
        'sum(quantity)': 3,
      },
    },
  ];

  describe('[mergeProjectAndErrorEvent]', () => {
    test('Project 배열과 Group 배열이 있을 때 Project와 Group을 병합한 결과를 반환한다.', () => {
      const merged = [
        { accepted: 1, id: 1, slug: 'test1' },
        { accepted: 2, id: 2, slug: 'test2' },
        { id: 2, rate_limited: 2, slug: 'test2' },
        { accepted: 3, id: 3, slug: 'test3' },
        { client_discard: 3, id: 3, slug: 'test3' },
      ];
      expect(mergeProjectAndErrorEvent(groups, projects)).toStrictEqual(merged);
    });
  });

  test('[groupByProject]', () => {
    const projectWithErrorEvent = [
      { accepted: 1, id: 1, slug: 'test1' },
      { accepted: 2, id: 2, slug: 'test2' },
      { id: 2, rate_limited: 2, slug: 'test2' },
      { accepted: 3, id: 3, slug: 'test3' },
      { client_discard: 3, id: 3, slug: 'test3' },
    ];
    expect(groupBy('id', projectWithErrorEvent)).toStrictEqual([
      { accepted: 1, id: 1, slug: 'test1' },
      { accepted: 2, id: 2, rate_limited: 2, slug: 'test2' },
      { accepted: 3, client_discard: 3, id: 3, slug: 'test3' },
    ]);
  });

  test('[parseErrorEventGroupByProject]', () => {
    expect(parseErrorEventGroupByProject(groups, projects)).toStrictEqual([
      {
        id: 1,
        slug: 'test1',
        accepted: 1,
        filtered: 0,
        client_discard: 0,
        rate_limited: 0,
      },
      {
        id: 2,
        slug: 'test2',
        accepted: 2,
        rate_limited: 2,
        filtered: 0,
        client_discard: 0,
      },
      {
        id: 3,
        slug: 'test3',
        accepted: 3,
        client_discard: 3,
        filtered: 0,
        rate_limited: 0,
      },
    ]);
  });
});
