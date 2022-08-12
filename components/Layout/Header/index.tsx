import React from 'react';
import cn from 'classnames';

import styles from './Header.module.scss';


function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="#" className={styles['logo__link']}>ARMAGGEDON V2</a>
        <p className={styles['logo__description']}>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</p>
      </div>
      <nav className={styles.navbar}>
        <a href="#" className={cn(styles.link, styles['link--active'])}>Астероиды</a>
        <a href="#" className={styles.link}>Заказ</a>
      </nav>
    </header>
  );
}

export default Header;
