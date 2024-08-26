import TransactionForm from '../components/forms/TransactionForm';
import StatisticsChart from '../components/sections/StatisticsChart/StatisticsChart';
import Transactions from '../components/sections/Transactions/Transactions';

const HomePage = () => {
  return (
    <div className='flex flex-col gap-6 items-center mx-auto relative justify-center text-white'>
      <div className='flex flex-col-reverse sm:flex-row w-full justify-center items-center gap-6 sm:gap-12'>
        <div className='flex-shrink-0 w-full max-w-[300px] sm:max-w-[360px] h-[300px] sm:h-[360px]'>
          <StatisticsChart />
        </div>

        <div className='flex-grow w-full max-w-md'>
          <TransactionForm />
        </div>
      </div>

      <Transactions />
    </div>
  );
};

export default HomePage;
