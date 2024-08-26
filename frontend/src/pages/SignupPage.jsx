import SignupForm from '../components/forms/SignupForm';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black'>
        <h2 className='font-bold text-xl text-neutral-200'>
          Welcome to Expense Tracker
        </h2>
        <p className='text-sm max-w-sm mt-2 text-neutral-300'>
          Keep track of your expenses easily and efficiently, all in one place.
        </p>
        <SignupForm />
        <p className='text-center text-sm mt-4 text-neutral-400'>
          Already have an account?{' '}
          <Link to='/login' className='text-neutral-200 underline'>
            Go back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
