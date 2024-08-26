import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { GET_AUTHENTICATED_USER } from '../../graphql/queries/user.query';

const PrivateRoute = ({ children }) => {
  const { error, data } = useQuery(GET_AUTHENTICATED_USER);

  if (error || !data?.authUser) return <Navigate to='/login' />;

  return children;
};

export default PrivateRoute;
