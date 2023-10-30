import type { OutcomeKey } from '../parseErrorEventGroupByProject';

class TotalQuantityGroupByOutcomeAndProject {
  by: {
    outcome: OutcomeKey;
    project: number;
  };

  totals: {
    'sum(quantity)': number;
  };

  constructor(props: any) {
    this.by = props.by;
    this.totals = props.totals;
  }
}

export default TotalQuantityGroupByOutcomeAndProject;
