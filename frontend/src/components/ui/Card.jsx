import { Link } from 'react-router-dom';
import { FaLocationDot, FaSackDollar } from 'react-icons/fa6';
import { BsCardText } from 'react-icons/bs';
import { MdOutlinePayments } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { HiPencilAlt } from 'react-icons/hi';

const categoryColorMap = {
  saving: 'from-green-700 to-green-400',
  expense: 'from-pink-800 to-pink-600',
  investment: 'from-blue-700 to-blue-400',
};

const Card = ({ cardType }) => {
  const cardClass = categoryColorMap[cardType];

  return (
    <div
      className={`rounded-md p-4 bg-gradient-to-br ${cardClass} transition-transform transform hover:scale-105 hover:shadow-lg`}
    >
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-lg font-bold text-white'>
            {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
          </h2>
          <div className='flex items-center gap-2'>
            <FaTrash className='cursor-pointer text-white hover:text-red-400 transition-colors' />
            <Link to={`/transaction/123`}>
              <HiPencilAlt
                className='cursor-pointer text-white hover:text-yellow-400 transition-colors'
                size={20}
              />
            </Link>
          </div>
        </div>
        <p className='text-white flex items-center gap-1'>
          <BsCardText />
          Description: Salary
        </p>
        <p className='text-white flex items-center gap-1'>
          <MdOutlinePayments />
          Payment Type: Cash
        </p>
        <p className='text-white flex items-center gap-1'>
          <FaSackDollar />
          Amount: $150
        </p>
        <p className='text-white flex items-center gap-1'>
          <FaLocationDot />
          Location: New York
        </p>

        <div className='mt-4'>
          <p className='text-xs text-white font-bold text-right'>21 Sep, 2001</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
