import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'redux/reduxAuth/authOperations';
import css from './UserMenu.module.css';
export const LogOut = () => {
  const userName = useSelector(state => state.users.user.name);
  const dispatch = useDispatch();
  const handleClickLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className={css.logoutWrapper}>
      <p className={css.text}>Welcome,{userName}</p>
      <button
        className={css.btn}
        type="button"
        onClick={() => {
          handleClickLogOut();
        }}
      >
        Log Out
      </button>
    </div>
  );
};
