import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';
import { ContactList } from 'components/ContactList/ContactList';
import css from './Contacts.module.css';
import { useSelector } from 'react-redux';
const Contacts = () => {
  const isRefreshed = useSelector(state => state.users.isRefreshed);
  return (
    !isRefreshed && (
      <div className={css.contactWrapper}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm />
        <h3 className={css.titleContacts}>Contacts</h3>
        <ContactFilter />
        <ContactList />
      </div>
    )
  );
};

export default Contacts;
