export const fillMissingFields = <
  DefaultValue extends Record<string, any>,
  LackObject extends Partial<DefaultValue> & Record<string, any>,
  FilledObject extends { [K in keyof DefaultValue]: DefaultValue[K] } & {
    [K in keyof LackObject]: LackObject[K];
  },
>(
  defaultValues: DefaultValue,
  lackObjects: LackObject[],
): FilledObject[] =>
  lackObjects.map((lackObject) => ({
    ...defaultValues,
    ...lackObject,
  })) as FilledObject[];
