import { Layout, Row, Typography } from 'antd';
import React from 'react';
import { Input } from 'antd';
import { IoIosAdd } from "react-icons/io";

import styles from './Search.module.css';

interface Props {
  name: string;
  setWechatModalVisibility: Function;
}

const Search: React.FC<Props> = (props) => {
  const { name, setWechatModalVisibility } = props;
  return (
    <div className={styles.title}>
      <div className={styles.newHome}>
        <div className={styles.plusIcon}>
          <IoIosAdd /> 
        </div>
        <div className={styles.newHomeText} onClick={() => setWechatModalVisibility(true)}>
          发布房源
        </div>
      </div>
      <div className={styles.searchBox}>
        <Input 
          placeholder={'搜索 区域/城市'}
        />
      </div>
    </div>
  );
};

export default Search;
