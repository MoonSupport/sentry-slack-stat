import { groupBy } from '../../util/groupBy';

describe('[groupBy]', () => {
  test('객체가 든 배열이 있을 때 키를 기준으로 group한다.', () => {
    const projectWithErrorEvent = [
      { accepted: 1, id: 1, slug: 'test1' },
      { accepted: 2, id: 2, slug: 'test2' },
      { id: 2, rate_limited: 2, slug: 'test2' },
      { accepted: 3, id: 3, slug: 'test3' },
      { client_discard: 3, id: 3, slug: 'test3' },
    ];
    const grouped = [
      { accepted: 1, id: 1, slug: 'test1' },
      { accepted: 2, id: 2, rate_limited: 2, slug: 'test2' },
      { accepted: 3, client_discard: 3, id: 3, slug: 'test3' },
    ];

    expect(groupBy('id', projectWithErrorEvent)).toStrictEqual(grouped);
  });
});
