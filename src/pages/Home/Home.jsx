import css from './Home.module.css';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className={css.homeWrapper}>
      <p className={css.text}>Welcone to the Contacts Website.</p>
      <p className={css.text}>
        To create your own, personally protected phonebook, just
        <Link to="/register" className={css.link}>
          {' '}
          Sign Up!
        </Link>
      </p>
    </div>
  );
};

export default Home;
