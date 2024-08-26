import { useQuery } from '@apollo/client';
import { Navigate, Outlet } from 'react-router-dom';
import { GET_AUTHENTICATED_USER } from '../../graphql/queries/user.query';
import Header from '../ui/Header';
import Loader from '../ui/Loader';

const RootLayout = () => {
  const { data, loading } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) {
    return <Loader />;
  }

  if (!data?.authUser) {
    return <Navigate to='/login' replace />;
  }

  return (
    <>
      <Header />
      <section className='mt-10'>
        <Outlet />
      </section>
    </>
  );
};

export default RootLayout;
