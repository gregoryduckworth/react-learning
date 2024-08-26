import LoginForm from '../components/forms/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black'>
        <h2 className='font-bold text-xl text-neutral-200'>
          Welcome Back to Expense Tracker
        </h2>
        <p className='text-sm max-w-sm mt-2 text-neutral-300'>
          Log in to continue managing your expenses and stay on top of your
          budget.
        </p>
        <LoginForm />
        <p className='text-center text-sm mt-4 text-neutral-400'>
          Don&apos;t have an account?{' '}
          <Link to='/signup' className='text-neutral-200 underline'>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
