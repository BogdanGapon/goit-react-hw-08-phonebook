import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operation';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts.items);

  const NameInputId = nanoid();
  const NumberInputId = nanoid();

  const handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    if (name === 'name') {
      setName(value.trim());
    } else if (name === 'number') {
      setNumber(value.trim());
    }
  };

  const handleSubmitContact = evt => {
    evt.preventDefault();

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    )
      alert(`${name} is already used.`);
    else {
      dispatch(addContact({ name, number }));
    }

    resetNameInput();
  };

  function resetNameInput() {
    setName('');
    setNumber('');
  }

  return (
    <form onSubmit={handleSubmitContact} className={css.form}>
      <label htmlFor={NameInputId} className={css.label}>
        Name
        <input
          className={css.input}
          id={NameInputId}
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label htmlFor={NumberInputId} className={css.label}>
        Number
        <input
          className={css.input}
          id={NumberInputId}
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          pattern="[0-9\-]+"
          title="Number may contain only numbers."
          required
        />
      </label>

      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
