import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const RestrictedRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(state => state.users.isLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};
