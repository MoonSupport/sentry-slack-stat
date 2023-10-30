export const groupBy = <T>(key: keyof T, projectWithErrorEvents: T[]): T[] => {
  const groupedProjectStore = projectWithErrorEvents.reduce<{
    [cacheKey in string]: T;
  }>((store, projectWithErrorEvent) => {
    const storeKey = String(projectWithErrorEvent[key]);
    const prev = store[storeKey] ?? {};
    store[storeKey] = Object.assign(prev, projectWithErrorEvent);
    return store;
  }, {});
  return Object.values(groupedProjectStore);
};
