// 유저의 정보

import { fillMissingFields } from '../util/fillMissingFields';
import { groupBy } from '../util/groupBy';

export type OutcomeKey =
  | 'accepted'
  | 'rate_limited'
  | 'client_discard'
  | 'filtered';

type Outcome = {
  [k in OutcomeKey]: number;
};

// https://docs.sentry.io/api/organizations/retrieve-event-counts-for-an-organization-v2/
export interface TotalQuantityGroupByOutcomeAndProject {
  by: {
    outcome: OutcomeKey;
    project: number;
  };
  totals: {
    'sum(quantity)': number;
  };
}

// https://docs.sentry.io/api/projects/list-your-projects/

export interface Project {
  id: number;
  slug: string;
}

export type ProjectWithErrorEvent = Project & Partial<Outcome>;
export type ErrorEventGroupByProject = Outcome & Project;

export const parseErrorEventGroupByProject = (
  totalQuantityGroupByOutcomeAndProjects: TotalQuantityGroupByOutcomeAndProject[],
  projects: Project[],
): ErrorEventGroupByProject[] => {
  const projectWithErrorEvents = mergeProjectAndErrorEvent(
    totalQuantityGroupByOutcomeAndProjects,
    projects,
  );
  const groupedProjectWithErrorEvents = groupBy('id', projectWithErrorEvents);

  return fillMissingFields(
    { accepted: 0, client_discard: 0, rate_limited: 0, filtered: 0 },
    groupedProjectWithErrorEvents,
  );
};

export const mergeProjectAndErrorEvent = (
  totalQuantityGroupByOutcomeAndProjects: TotalQuantityGroupByOutcomeAndProject[],
  projects: Project[],
) => {
  return totalQuantityGroupByOutcomeAndProjects.reduce<ProjectWithErrorEvent[]>(
    (arr, totalQuantityGroupByOutcomeAndProject) => {
      const matchedProject = projects.find(
        (project) =>
          totalQuantityGroupByOutcomeAndProject.by.project === project.id,
      );
      if (!matchedProject)
        throw new Error(
          `Unexpected Project ID:${totalQuantityGroupByOutcomeAndProject.by.project}`,
        );

      const mergedErrorEvent = {
        ...matchedProject,
        id: matchedProject.id,
        [totalQuantityGroupByOutcomeAndProject.by.outcome]:
          totalQuantityGroupByOutcomeAndProject.totals['sum(quantity)'],
      };

      return arr.concat(mergedErrorEvent);
    },
    [],
  );
};
