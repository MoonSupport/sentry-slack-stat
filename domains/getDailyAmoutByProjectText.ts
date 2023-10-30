import { A, D } from '@mobily/ts-belt';

import { getYesterDayStartAndEnd } from '../../util/getYesterDayStartAndEnd';
import { wrapCodeBlock } from '../../util/wrapCodeBlock';
import { buildTable } from '../buildTable';
import { parseErrorEventGroupByProject } from '../parseErrorEventGroupByProject';
import {
  getErrorEventsByProjectAndOutcome,
  getProjects,
} from '../sentryClient';
import Project from '../vo/Project';
import TotalQuantityGroupByOutcomeAndProject from '../vo/TotalQuantityGroupByOutcomeAndProject';

const getDailyAmoutByProjectText = async (): Promise<string> => {
  const [yesterday0000, yesterday2359] = getYesterDayStartAndEnd();
  const rawTotalQuantityGroupByOutcomeAndProjects =
    await getErrorEventsByProjectAndOutcome(yesterday0000, yesterday2359);
  const rawProjects = await getProjects();

  const totalQuantityGroupByOutcomeAndProjects =
    rawTotalQuantityGroupByOutcomeAndProjects.groups.map(
      (group: any) => new TotalQuantityGroupByOutcomeAndProject(group),
    );
  const project = rawProjects.map((project: any) => new Project(project));

  const errorEvents = parseErrorEventGroupByProject(
    totalQuantityGroupByOutcomeAndProjects,
    project,
  );
  const errorEventsWithoutId = A.map(errorEvents, D.deleteKeys(['id']));

  const table = buildTable(errorEventsWithoutId);
  const tableInCodeBlock = wrapCodeBlock(table);
  return tableInCodeBlock;
};

export default getDailyAmoutByProjectText;
