'use client'
import React from 'react';
import { SortAscendingOutlined, FilterOutlined } from '@ant-design/icons';

import styles from './Filter.module.css';

interface Props {
  name: string;
}

const Filter: React.FC<Props> = (props) => {
  const { name } = props;
  return (
    <div className={styles.title}>
      <div className={styles.sort}>
        排序
        <div className={styles.fnIcon}>
          <SortAscendingOutlined />
        </div>
      </div>
      <div className={styles.condition}>
        筛选条件 
        <div className={styles.fnIcon}>
          <FilterOutlined />
        </div>
      </div>
    </div>
  );
};

export default Filter;
