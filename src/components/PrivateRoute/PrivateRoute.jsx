import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(state => state.users.isLoggedIn);

  const isRefreshed = useSelector(state => state.users.isRefreshed);

  const shouldRefresh = !isLoggedIn && !isRefreshed;
  return shouldRefresh ? <Navigate to={redirectTo} /> : component;
};
