import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BarChartContainer } from './BarChart.styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  ChartDataLabels
);

type IBarChart = {
  values: Array<{
    count: number;
    name: string;
  }>;
};

const BarChart = ({ values }: IBarChart) => {
  const labels = values.map((el) => el.name);
  const count = values.map((el) => el.count);

  const data: ChartData<'bar', number[], string> = {
    labels,

    datasets: [
      {
        label: 'Sales',
        backgroundColor: [
          '#FDC47F',
          '#FF9311',
          '#DCD6FC',
          '#9D8DF4',
          '#695CA8',
          '#695CA8',
          '#DEDCDF',
        ],
        borderWidth: 0,
        borderRadius: 4,
        data: count,
      },
    ],
  };

  return (
    <BarChartContainer>
      <Bar
        data={data}
        options={{
          indexAxis: 'y',

          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              align: 'right',
              color: '#241B5E',
              anchor: 'end',
              font: {
                weight: 'bold',
                family: 'Poppins',
                size: 8,
              },
            },
          },

          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </BarChartContainer>
  );
};

export default BarChart;
