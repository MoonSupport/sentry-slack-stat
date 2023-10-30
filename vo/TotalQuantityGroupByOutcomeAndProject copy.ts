import type { OutcomeKey } from '../parseErrorEventGroupByProject';

class TotalQuantityGroupByOutcomeAndCateogry {
  by: {
    outcome: OutcomeKey;
    category: number;
  };

  series: {
    'sum(quantity)': number[];
  };

  intervals: string[];

  constructor(props: any) {
    this.by = props.by;
    this.intervals = props.intervals;
    this.series = props.groups[0].series;
  }
}

export default TotalQuantityGroupByOutcomeAndCateogry;
