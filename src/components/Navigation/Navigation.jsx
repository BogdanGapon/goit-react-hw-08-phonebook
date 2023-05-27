import { NavLink } from 'react-router-dom';
import { Auth } from 'components/AuthNav/Auth';
import { LogOut } from 'components/UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import css from './Navigation.module.css';
export const Navigation = () => {
  const isLoggedIn = useSelector(state => state.users.isLoggedIn);
  return (
    <>
      <NavLink to="/" className={css.navLink}>
        Home
      </NavLink>
      <NavLink to="/contacts" className={css.navLink}>
        Contacts
      </NavLink>
      {isLoggedIn ? <LogOut /> : <Auth />}
    </>
  );
};
