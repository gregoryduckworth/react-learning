import { useQuery } from '@apollo/client';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { GET_CATEGORY_STATISTICS } from '../../../graphql/queries/transaction.query';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = () => {
  const { data, loading, error } = useQuery(GET_CATEGORY_STATISTICS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const colorMap = {
    saving: {
      backgroundColor: 'rgba(34, 197, 94, 0.8)', // Green
      borderColor: 'rgba(34, 197, 94, 1)',
    },
    expense: {
      backgroundColor: 'rgba(255, 99, 132, 0.8)', // Red
      borderColor: 'rgba(255, 99, 132, 1)',
    },
    investment: {
      backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue
      borderColor: 'rgba(59, 130, 246, 1)',
    },
  };

  const labels = data.categoryStatistics.map((stat) => stat.category);
  const chartValues = data.categoryStatistics.map((stat) => stat.totalAmount);

  const backgroundColors = labels.map(
    (category) => colorMap[category]?.backgroundColor || 'rgba(128, 128, 128, 0.8)'
  );
  const borderColors = labels.map(
    (category) => colorMap[category]?.borderColor || 'rgba(128, 128, 128, 1)'
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: '%',
        data: chartValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
        cutout: '70%',
        borderRadius: 10,
        rotation: -90,
        spacing: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          boxWidth: 12,
          padding: 10,
        },
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ddd',
        borderWidth: 1,
        caretPadding: 10,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    maintainAspectRatio: false,
  };

  return (
    <div className='flex-shrink-0 w-full max-w-[300px] sm:max-w-[360px] h-[300px] sm:h-[360px]'>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default StatisticsChart;
