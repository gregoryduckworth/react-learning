import { useQuery } from '@apollo/client';
import { Navigate, Outlet } from 'react-router-dom';
import { GET_AUTHENTICATED_USER } from '../../graphql/queries/user.query';
import Loader from '../ui/Loader';

const AuthLayout = () => {
  const { data, loading } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) {
    return <Loader />;
  }

  if (data?.authUser) {
    return <Navigate to='/' replace />;
  }

  return (
    <section className='flex justify-center items-center'>
      <Outlet />
    </section>
  );
};

export default AuthLayout;
