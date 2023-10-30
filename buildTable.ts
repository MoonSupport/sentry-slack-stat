import { A, O, pipe, S } from '@mobily/ts-belt';

import { unzip } from '../util/unzip';

interface JoinDeepSeparatorOption {
  shallow: string;
  deep: string;
}

export const joinDeep =
  <T>(separator: JoinDeepSeparatorOption = { shallow: '', deep: '' }) =>
  (table: ReadonlyArray<ReadonlyArray<T>>): string =>
    pipe(
      table,
      A.map((x) => A.join(x, separator.shallow)),
      A.join(separator.deep),
    );

type FormatDeepWithMaxLengthCallback<T> = (
  cell: T,
  maxLength: number,
) => string;

export const formatDeepWithMaxLength =
  <T>(callback: FormatDeepWithMaxLengthCallback<T>) =>
  (
    tables: ReadonlyArray<ReadonlyArray<T>>,
  ): ReadonlyArray<ReadonlyArray<string>> => {
    const zeroArr = pipe(
      tables,
      A.head,
      O.mapWithDefault([], (shallow) => A.map(shallow, (_) => 0)),
    );

    const maxLengths = pipe(
      tables,
      toStringLength,
      A.reduce(zeroArr, deepMaxLength),
    );

    return pipe(tables, A.map(A.zipWith(maxLengths, callback)));
  };

export const toStringLength = <T>(
  deep: ReadonlyArray<ReadonlyArray<T>>,
): ReadonlyArray<ReadonlyArray<number>> =>
  pipe(
    deep,
    A.map((shallow) => pipe(shallow, A.map(String), A.map(S.length))),
  );

const deepMaxLength = (
  _1: ReadonlyArray<number>,
  _2: ReadonlyArray<number>,
): ReadonlyArray<number> => A.zipWith(_1, _2, Math.max);

export const center: FormatDeepWithMaxLengthCallback<string> = (
  cell,
  maxLength,
) => {
  const diff = (maxLength - cell.length) / 2;
  const leftPadding = ' '.repeat(Math.ceil(diff));
  const rightPadding = ' '.repeat(Math.floor(diff));
  return `${leftPadding}${cell}${rightPadding}`;
};

export const buildTable = (
  objects: readonly { [k in string]: unknown }[],
): string =>
  pipe(
    objects,
    unzip,
    formatDeepWithMaxLength(center),
    joinDeep({
      shallow: '|',
      deep: '\n',
    }),
  );
