import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/reduxAuth/authOperations';
import css from './Login.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailId = nanoid();
  const passwordId = nanoid();
  const dispatch = useDispatch();
  const handleChange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmitLogIn = e => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
    resetForm();
  };
  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <form
      className={css.form}
      onSubmit={e => {
        handleSubmitLogIn(e);
      }}
    >
      <h3 className={css.form__title}>Login Here</h3>
      <label htmlFor={emailId} className={css.label}>
        Email
        <input
          className={css.input}
          type="email"
          value={email}
          name="email"
          id={emailId}
          onChange={e => {
            handleChange(e);
          }}
        />
      </label>

      <label htmlFor={passwordId} className={css.label}>
        Password
        <input
          className={css.input}
          type="password"
          value={password}
          name="password"
          id={passwordId}
          onChange={e => {
            handleChange(e);
          }}
        />
      </label>
      <button type="submit" className={css.btn}>
        Log in
      </button>
      <p className={css.text}>
        Not a member?{' '}
        <Link className={css.link} to="/register">
          Sign up
        </Link>
      </p>
    </form>
  );
};

Login.propTypes = {
  password: PropTypes.string,
  email: PropTypes.string,
};
export default Login;
