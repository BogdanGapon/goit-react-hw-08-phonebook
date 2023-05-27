import { fetchAll } from 'redux/operation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './Navigation/Navigation';
import Home from 'pages/Home/Home';
import Register from 'pages/Register/Register';
import Login from 'pages/Login/Login';
import Contacts from 'pages/Contacts/Contacts';
import { refreshUser } from 'redux/reduxAuth/authOperations';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import css from './App.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.users.isLoggedIn);
  const isRefreshed = useSelector(state => state.users.isRefreshed);
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    const promise = dispatch(fetchAll());
    return () => {
      promise.abort();
    };
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const promise = dispatch(refreshUser());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    !isRefreshed && (
      <>
        <header className={css.header}>
          <nav className={css.navMenu}>
            <Navigation />
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<Register />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute component={<Login />} redirectTo="/contacts" />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<Contacts />} redirectTo="/login" />
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </>
    )
  );
};
