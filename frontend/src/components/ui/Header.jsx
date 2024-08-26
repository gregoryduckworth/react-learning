import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'sonner';
import { LOGOUT } from '../../graphql/mutations/user.mutation';
import { GET_AUTHENTICATED_USER } from '../../graphql/queries/user.query';

const Header = () => {
  const { data } = useQuery(GET_AUTHENTICATED_USER);
  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ['GetAuthenticatedUser'],
  });

  const handleLogout = async () => {
    try {
      await logout();
      client.resetStore();
      toast.success('Successfully logged out');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <header className='bg-transparent text-white p-4'>
      <div className='flex justify-between items-center mx-auto max-w-7xl'>
        <div className='relative flex-1'>
          <h1 className='text-lg md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold text-center'>
            <Link to='/'>Expense Tracker</Link>
          </h1>
          <div className='absolute inset-x-0 bottom-[-10px] flex justify-center'>
            <div className='w-full max-w-[300px] md:max-w-[600px] lg:max-w-[800px]'>
              <div className='bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[5px] blur-sm' />
              <div className='bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px' />
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          {data?.authUser?.profilePicture && (
            <img
              src={data.authUser.profilePicture}
              alt='Profile'
              className='w-8 md:w-10 rounded-full border-2 border-neutral-200'
            />
          )}
          <FaSignOutAlt
            onClick={handleLogout}
            className={`text-2xl cursor-pointer hover:text-blue-500 transition-colors duration-300 ${
              loading ? 'animate-spin' : ''
            }`}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
