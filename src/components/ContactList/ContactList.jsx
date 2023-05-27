import { useDispatch, useSelector } from 'react-redux';
import { VscChromeClose } from 'react-icons/vsc';
import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { deleteContact } from 'redux/operation.js';

export const ContactList = () => {
  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const dispatch = useDispatch();

  const createMarkupByFoundContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };
  return (
    <ul className={css.list}>
      {isLoading ? (
        <ThreeDots
          height="40"
          width="40"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
        />
      ) : (
        createMarkupByFoundContacts().map(contact => {
          return (
            <li key={contact.id} className={css.list__item}>
              {contact.name}: {contact.number}
              <button
                className={css.btn}
                type="button"
                title="Delete contact"
                onClick={() => dispatch(deleteContact(contact.id))}
              >
                <VscChromeClose className={css.svg_cross} />
              </button>
            </li>
          );
        })
      )}
    </ul>
  );
};

ContactList.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.array,
};
