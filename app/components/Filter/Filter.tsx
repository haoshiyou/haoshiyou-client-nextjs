'use client'
import React from 'react';
import { TbArrowsSort } from 'react-icons/tb';
import { IoOptionsOutline } from 'react-icons/io5';

import styles from './Filter.module.css';

interface Props {
  toogleLayout: string;
}

const filterConditionVisible = true;

const Filter: React.FC<Props> = (props) => {
  const { toogleLayout } = props;

  const listLayout = (
    <div className={styles.title}>
      <div className={styles.sort}>
        排序 
        <div className={styles.sortOption}>
          <div className={styles.fnIcon}>
            <TbArrowsSort />
          </div>
        </div>
      </div>
      {filterConditionVisible && (
        <div className={styles.condition}>
        筛选条件&nbsp;
        <div className={styles.fnIcon}>
          <IoOptionsOutline />
        </div>
      </div>
      )}
    </div>
  );

  const mapLayout = (
    <div className={styles.mapFilter}>
      <div className={styles.sort}>
        排序 
        <div className={styles.sortOption}>
          <div className={styles.fnIcon}>
            <TbArrowsSort />
          </div>
        </div>
      </div>
      {filterConditionVisible && (
        <div className={styles.condition}>
        筛选条件&nbsp;
        <div className={styles.fnIcon}>
          <IoOptionsOutline />
        </div>
      </div>
      )}
    </div>
  );

  return (
    <>
      {toogleLayout === 'list' && listLayout}
      {toogleLayout === 'map' && mapLayout}
    </>
  );
};

export default Filter;
