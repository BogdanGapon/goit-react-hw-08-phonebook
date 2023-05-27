import { NavLink } from 'react-router-dom';
import css from './Auth.module.css';
export const Auth = () => {
  return (
    <div>
      <NavLink to="/login" className={css.navLink}>
        Log in
      </NavLink>
      <NavLink to="/register" className={css.navLink}>
        Sign up
      </NavLink>
    </div>
  );
};
