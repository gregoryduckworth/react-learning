import { Link } from 'react-router-dom';
import { FaLocationDot, FaSackDollar } from 'react-icons/fa6';
import { BsCardText } from 'react-icons/bs';
import { MdOutlinePayments } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { HiPencilAlt } from 'react-icons/hi';
import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
import { DELETE_TRANSACTION } from '../../../graphql/mutations/transaction.mutation';
import { categoryColorMap } from '../../../lib/constants';

const TransactionCard = ({ transaction }) => {
  const { _id, category, description, paymentType, amount, location, date } =
    transaction;

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    variables: { transactionId: _id },
    onCompleted: () => {
      toast.success('Transaction deleted successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
    refetchQueries: ['GetTransactions'],
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction();
    }
  };

  const timestamp = parseInt(date, 10);
  const transactionDate = new Date(timestamp);
  const formattedDate = isNaN(transactionDate.getTime())
    ? 'Invalid date'
    : transactionDate.toLocaleDateString();

  const cardClass = categoryColorMap[category] || 'from-gray-500 to-gray-400';

  return (
    <div
      className={`rounded-md p-4 bg-gradient-to-br ${cardClass} transition-transform transform hover:scale-105 hover:shadow-lg`}
    >
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-lg font-bold text-white'>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div className='flex items-center gap-2'>
            <FaTrash
              className='cursor-pointer text-white hover:text-red-400 transition-colors'
              onClick={handleDelete}
            />
            <Link to={`/transaction/${_id}`}>
              <HiPencilAlt
                className='cursor-pointer text-white hover:text-yellow-400 transition-colors'
                size={20}
              />
            </Link>
          </div>
        </div>
        <p className='text-white flex items-center gap-1'>
          <BsCardText />
          Description: {description}
        </p>
        <p className='text-white flex items-center gap-1'>
          <MdOutlinePayments />
          Payment Type: {paymentType}
        </p>
        <p className='text-white flex items-center gap-1'>
          <FaSackDollar />
          Amount: ${amount}
        </p>
        <p className='text-white flex items-center gap-1'>
          <FaLocationDot />
          Location: {location}
        </p>

        <div className='mt-4'>
          <p className='text-xs text-white font-bold text-right'>
            {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
