import { unzip } from '../../util/unzip';
import { formatDeepWithMaxLength, joinDeep } from '../buildTable';

describe('[buildTable]', () => {
  describe('[unzip]', () => {
    test('Object의 키와 값을 가지고 2차원 배열을 만든다.', () => {
      const texts = [
        { aabcd1: '1', abcd2: '2', abcd3: '3', abcd4: '4', abcd5: '5' },
        { aabcd1: '5', abcd2: '4', abcd3: '3', abcd4: '2', abcd5: '1' },
      ];

      const keysAndValues = unzip(texts);

      expect(keysAndValues).toStrictEqual([
        ['aabcd1', 'abcd2', 'abcd3', 'abcd4', 'abcd5'],
        ['1', '2', '3', '4', '5'],
        ['5', '4', '3', '2', '1'],
      ]);
    });

    test('만약 빈 배열을 인자로 넘기면 비어있는 이중 배열을 반환한다.', () => {
      const texts = [] as any;

      const keysAndValues = unzip(texts);

      expect(keysAndValues).toStrictEqual([[]]);
    });
  });

  describe('[formatDeepWithMaxLength]', () => {
    test('2차원 배열의 원소와 각 원소의 인덱스 중 최대길이를 이용해서 새로운 원소형식을 만든다.', () => {
      const deepArray = [
        ['aabcd1', 'abcd2', 'abcd3', 'abcd4', 'abcd5'],
        ['1', '2', '3', '4', '5'],
        ['5', '4', '3', '2', '1'],
      ];

      const getElementWithMaxlengthEachIndex = formatDeepWithMaxLength(
        (element, maxLength) => {
          return `${element}: ${maxLength}`;
        },
      );

      const elementWithMaxlengthEachIndex =
        getElementWithMaxlengthEachIndex(deepArray);

      expect(elementWithMaxlengthEachIndex).toStrictEqual([
        ['aabcd1: 6', 'abcd2: 5', 'abcd3: 5', 'abcd4: 5', 'abcd5: 5'],
        ['1: 6', '2: 5', '3: 5', '4: 5', '5: 5'],
        ['5: 6', '4: 5', '3: 5', '2: 5', '1: 5'],
      ]);
    });

    test('callback에 반환값이 없다면 undefined를 반환한다.', () => {
      const deepArray = [
        ['aabcd1', 'abcd2', 'abcd3', 'abcd4', 'abcd5'],
        ['1', '2', '3', '4', '5'],
        ['5', '4', '3', '2', '1'],
      ];

      const getElementWithMaxlengthEachIndex = formatDeepWithMaxLength(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        (maxLength, element) => {},
      );

      const elementWithMaxlengthEachIndex =
        getElementWithMaxlengthEachIndex(deepArray);

      expect(elementWithMaxlengthEachIndex).toStrictEqual([
        [undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined],
      ]);
    });
  });

  describe('[joinDeep]', () => {
    test('이중 배열을 join한다 이 때, shallow는 내부 요소들의 seperator 이며 deep은 외부 요소들의 seperator이다. 이 때, 마지막 seperator는 생략 한다.', () => {
      const deepArray = [
        ['aabcd1', 'abcd2', 'abcd3', 'abcd4', 'abcd5'],
        ['1', '2', '3', '4', '5'],
        ['5', '4', '3', '2', '1'],
      ];

      const buildTable = joinDeep({
        shallow: '|',
        deep: '\n',
      });
      expect(buildTable(deepArray)).toBe(
        'aabcd1|abcd2|abcd3|abcd4|abcd5\n1|2|3|4|5\n5|4|3|2|1',
      );
    });

    test('seperator를 인자로 넘겨주지 않으면 기본 값은 빈 문자열이다.', () => {
      const deepArray = [
        ['aabcd1', 'abcd2', 'abcd3', 'abcd4', 'abcd5'],
        ['1', '2', '3', '4', '5'],
        ['5', '4', '3', '2', '1'],
      ];

      const buildTable = joinDeep();
      expect(buildTable(deepArray)).toBe(
        'aabcd1abcd2abcd3abcd4abcd51234554321',
      );
    });
  });
});
