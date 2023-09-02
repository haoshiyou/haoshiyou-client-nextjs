'use client'
import React from 'react';

import styles from './HomePreviewCard.module.css';

interface Props {
  name: string;
}

const filterConditionVisible = false;

const HomePreviewCard: React.FC<Props> = (props) => {
  const { name } = props;
  return (
    <div className={styles.title}>
      name
    </div>
  );
};

export default HomePreviewCard;
