import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS } from '../../../graphql/queries/transaction.query';
import TransactionCard from './TransactionCard'; // Adjust the import path as needed

const Transactions = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { transactions } = data;

  return (
    <div className='w-full px-10 max-w-7xl min-h-[40vh] my-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-start flex-wrap'>
        {transactions.map((transaction) => (
          <TransactionCard key={transaction._id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
