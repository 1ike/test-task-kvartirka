import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';

import styles from './Order.module.scss';


const Order: NextPage = () => {
  return (
    <div className={styles.container}>
      <button type="button">fetchAsteroids</button>
    </div>
  );
};

export default Order;
