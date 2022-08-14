/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext } from 'react';
import type { NextPage } from 'next';
import cn from 'classnames';

import styles from './Settings.module.scss';
import { AsteroidsContext, MissDistanceDisplay } from '../../app/contexts/Asteroids';


const Settings: NextPage = () => {
  const {
    missDistanceDisplay, setMissDistanceDisplay, onlyDangerous, setOnlyDangerous,
  } = useContext(AsteroidsContext);


  const onChangeMissDistanceDisplay: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value === MissDistanceDisplay.kilometers
      ? MissDistanceDisplay.kilometers : MissDistanceDisplay.lunar;
    setMissDistanceDisplay!(value);
  };

  const onChangeOnlyDangerous: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setOnlyDangerous!(e.target.checked);
  };


  return (
    <div className={styles.settings}>
      <div className={styles.radio}>
        Отображать расстояние:
        <label
          className={cn(
            styles.radio__label,
            { [styles['radio__label--active']]: missDistanceDisplay === MissDistanceDisplay.kilometers },
          )}
        >
          <input
            type="radio"
            name="missDistanceDisplay"
            value={MissDistanceDisplay.kilometers}
            className={styles.radio__input}
            onChange={onChangeMissDistanceDisplay}
          />
          в километрах
        </label>
        <span className={styles.radio__separator} />
        <label
          className={cn(
            styles.radio__label,
            { [styles['radio__label--active']]: missDistanceDisplay === MissDistanceDisplay.lunar },
          )}
        >
          <input
            type="radio"
            name="missDistanceDisplay"
            value={MissDistanceDisplay.lunar}
            className={styles.radio__input}
            onChange={onChangeMissDistanceDisplay}
          />
          в лунных орбитах
        </label>
      </div>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          value="onlyDangerous"
          checked={onlyDangerous}
          className={styles.checkbox__input}
          onChange={onChangeOnlyDangerous}
        />
        Показать только опасные
      </label>
    </div>
  );
};

export default Settings;
