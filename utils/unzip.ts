import { A, D, O, pipe } from '@mobily/ts-belt';

export const unzip = <T extends { [key in string]: unknown }>(
  arr: ReadonlyArray<T>,
): ReadonlyArray<ReadonlyArray<string>> =>
  pipe(
    arr,
    A.head,
    O.getWithDefault({} as { [key: string]: unknown }),
    D.keys,
    (keys) =>
      A.concat(
        [keys as string[]],
        A.map(arr, (obj) => pipe(obj, Object.values, A.map(String))),
      ),
  );
