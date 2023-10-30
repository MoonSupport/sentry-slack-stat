// https://quickchart.io/documentation/chart-types/
interface ChartProps {
  type: 'bar' | 'line';
  data: {
    labels: string[];
    datasets: {
      type: string;
      label: string;
      borderColor: string;
      borderWidth: number;
      fill: boolean;
      data: number[];
    }[];
  };
  options: {
    title: {
      display: boolean;
      text: string;
    };
  };
}

const generateQuickChartURL = (chartProps: ChartProps) =>
  `https://quickchart.io/chart?v=2.9.4&c=${JSON.stringify(
    chartProps,
  ).replaceAll(`"`, `'`)}`;

export default generateQuickChartURL;
