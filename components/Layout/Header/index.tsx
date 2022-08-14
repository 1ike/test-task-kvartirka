/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useState, useCallback, useEffect, PropsWithChildren,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

import styles from './Header.module.scss';
import { APOD } from '../../../pages/api/apod';
import API from '../../../app/API';


function ActiveLink({ children, href }: PropsWithChildren<{ href: string }>) {
  const router = useRouter();
  const className = cn(styles.link, { [styles['link--active']]: router.asPath === href });

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}


function Header() {
  const [apod, setAPOD] = useState<APOD | null>(null);

  const fetchAPOD = useCallback(
    () => {
      API.fetchAPOD()
        .then((newAPOD) => {
          setAPOD(newAPOD);
        }).catch((error) => console.log('error = ', error));
    },
    [setAPOD],
  );

  useEffect(() => {
    fetchAPOD();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={styles.wrapper}
      style={
        apod
          ? { backgroundImage: `url(${apod.url})` }
          : {}
      }
    >
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/"><a className={styles.logo__link}>ARMAGGEDON V2</a></Link>
          <p className={styles.logo__description}>
            Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.
          </p>
        </div>
        <nav className={styles.navbar}>
          <ActiveLink href="/">
            Астероиды
          </ActiveLink>
          <ActiveLink href="/order">Заказ</ActiveLink>
        </nav>
      </header>
    </div>
  );
}

export default Header;
