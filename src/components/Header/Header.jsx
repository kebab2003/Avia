import styles from './Header.module.scss';
import logo from '../../images/Logo.png';
function Header() {
  return (
    <header>
      <img src={logo} alt="логотип" className={styles.logo} />
    </header>
  );
}

export default Header;
