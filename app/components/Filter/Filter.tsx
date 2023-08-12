'use client'
import React from 'react';
import { SortAscendingOutlined, FilterOutlined, DownOutlined } from '@ant-design/icons';

import styles from './Filter.module.css';

interface Props {
  name: string;
}

const filterConditionVisible = false;

const Filter: React.FC<Props> = (props) => {
  const { name } = props;
  return (
    <div className={styles.title}>
      <div className={styles.sort}>
        排序: 
        <div className={styles.sortOption}>
          Time
          <div className={styles.fnIcon}>
            <DownOutlined />
          </div>
        </div>
      </div>
      {filterConditionVisible && (
        <div className={styles.condition}>
        筛选条件 
        <div className={styles.fnIcon}>
          <FilterOutlined />
        </div>
      </div>
      )}
    </div>
  );
};

export default Filter;
