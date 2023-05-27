import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from 'redux/filterSlice';
import PropTypes from 'prop-types';
import css from './ContactFIlter.module.css';
export const ContactFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  return (
    <input
      className={css.input}
      type="text"
      name="filter"
      value={filter}
      placeholder="Filter contacts by name"
      onChange={e => dispatch(filterContacts(e.currentTarget.value))}
    />
  );
};

ContactFilter.propTypes = {
  filter: PropTypes.string,
};
