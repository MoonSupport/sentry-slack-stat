import { fillMissingFields } from '../../util/fillMissingFields';

describe('[filterMissingFields]', () => {
  test('객체가 든 배열이 있을 때 객체 요소에 defaultFields에 값이 없다면 defaultFields로 채운다.', () => {
    const lackObjects = [{ field1: 'field1', field2: 'field2' }];
    const defaultFields = {
      defaultField1: 'defaultField1',
      defaultField2: 'defaultField2',
      field2: 'field2',
    };
    const fillObjects = [
      {
        defaultField1: 'defaultField1',
        defaultField2: 'defaultField2',
        field1: 'field1',
        field2: 'field2',
      },
    ];

    expect(fillMissingFields(defaultFields, lackObjects)).toStrictEqual(
      fillObjects,
    );
  });
});
