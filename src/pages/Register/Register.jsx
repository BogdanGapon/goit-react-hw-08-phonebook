import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from 'redux/reduxAuth/authOperations';
import PropTypes from 'prop-types';
import css from './Register.module.css';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nameId = nanoid();
  const emailId = nanoid();
  const passwordId = nanoid();
  const dispatch = useDispatch();

  const handleChange = e => {
    const elementName = e.target.name;
    const value = e.target.value;
    if (elementName === 'name') {
      setName(value);
    } else if (elementName === 'email') {
      setEmail(value);
    } else if (elementName === 'password') {
      setPassword(value);
    }
  };
  const handleSubmitSignUp = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setName('');
    setPassword('');
  };

  return (
    <form
      className={css.form}
      onSubmit={e => {
        handleSubmitSignUp(e);
      }}
    >
      <h3 className={css.form__title}>Sign Up Here</h3>
      <div className={css.inputWrapper}>
        <input
          className={css.input}
          type="text"
          id={nameId}
          value={name}
          name="name"
          onInput={e => handleChange(e)}
        />
        <label htmlFor={nameId} className={css.label}>
          Name
        </label>
      </div>
      <div className={css.inputWrapper}>
        <input
          className={css.input}
          type="email"
          id={emailId}
          value={email}
          name="email"
          onInput={e => handleChange(e)}
        />
        <label htmlFor={emailId} className={css.label}>
          Email
        </label>
      </div>
      <div className={css.inputWrapper}>
        <input
          className={css.input}
          type="password"
          id={passwordId}
          value={password}
          name="password"
          onInput={e => handleChange(e)}
        />
        <label htmlFor={passwordId} className={css.label}>
          Password
        </label>
      </div>
      <button type="submit" className={css.btn}>
        Sign up
      </button>
      <p className={css.text}>
        Already have an account?{' '}
        <Link className={css.link} to="/login">
          Log in
        </Link>
      </p>
    </form>
  );
};

Register.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
};

export default Register;
