import { Layout, Row, Typography } from 'antd';
import React from 'react';
import { Input } from 'antd';
import { IoIosAddCircle } from "react-icons/io";
import { BiSearch } from "react-icons/bi";

import styles from './Search.module.css';

interface Props {
  name: string;
  setWechatModalVisibility: Function;
}

const Search: React.FC<Props> = (props) => {
  const { name, setWechatModalVisibility } = props;
  return (
    <div className={styles.title}>
      <div className={styles.searchBox}>
        <Input 
          suffix={
            <BiSearch />  
          }
        />
      </div>
      <div className={styles.newHome}>
        <div className={styles.plusIcon}>
          <IoIosAddCircle /> 
        </div>
        <div className={styles.newHomeText} onClick={() => setWechatModalVisibility(true)}>
          发布房源
        </div>
      </div>
    </div>
  );
};

export default Search;
