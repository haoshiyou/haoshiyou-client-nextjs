import React, {useEffect, useState} from 'react';
import { Input, AutoComplete } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';
import { IoIosAddCircle } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import _get from 'lodash/get';

import styles from './Search.module.css';

interface Props {
  name: string;
  setWechatModalVisibility: Function;
  searchDropdownVisibility: boolean;
  searchFilter: Object;
  searchStr: string;
  setSearchStr: Function;
}

const Search: React.FC<Props> = (props) => {
  const { setWechatModalVisibility, searchDropdownVisibility, searchFilter, searchStr, setSearchStr } = props;
  const [cityOptions, setCityOptions] = useState([]);
  const [zipcodeOptions, setZipcodeOptions] = useState([]);
  const [inputSearchStr, setInputSearchStr] = useState('');
  
  const renderTitle = (title: string) => (
    <span>
      {title}
    </span>
  );
  
  const renderItem = (title: string, count: number) => ({
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
      </div>
    ),
  });

  const reloadFilters = () => {
    const city = _get(searchFilter, 'city', []);
    const zipcode = _get(searchFilter, 'zipcode', []);
    setCityOptions(city);
    setZipcodeOptions(zipcode);
  };

  useEffect(() => {
    reloadFilters();
  }, [searchFilter]);


  const options = [
    {
      label: renderTitle('城市'),
      options: cityOptions.map((eachC: string) => renderItem(eachC, 1)),
    },
    {
      label: renderTitle('邮编'),
      options: zipcodeOptions.map((eachZ: string) => renderItem(eachZ, 1)),
    },
  ];
  
  

  const dropdownOnSearch = (x: string) => {
    const city = _get(searchFilter, 'city', []);
    const filteredCity = city.filter((eachC) => eachC.toLowerCase().includes(x.toLowerCase()));
    setCityOptions(filteredCity);
    const zipcode = _get(searchFilter, 'zipcode', []);
    const filteredZipcode = zipcode.filter((eachC) => eachC.toLowerCase().includes(x.toLowerCase()));
    setZipcodeOptions(filteredZipcode);
    setInputSearchStr(x);
  };

  const dropdownOnSelect = (x: string) => {
    setSearchStr(x);
    setInputSearchStr(x);
    reloadFilters();
  }
  const dropdownOnClear = () => {
    setSearchStr('');
    setInputSearchStr('');
    reloadFilters();
  }
 
  return (
    <div className={styles.title}>
      <div className={styles.searchBox}>
        <div className={styles.autoComplete}>
          <AutoComplete
            value={inputSearchStr}
            popupClassName="certain-category-search-dropdown"
            options={options}
            size="large"
            style={{ width: '100%', 'minWidth': '400px' }}
            onSearch={dropdownOnSearch}
            onSelect={dropdownOnSelect}
            onClear={dropdownOnClear}
            allowClear={{ 
              clearIcon: <CloseSquareFilled style={{width: '16px', height: '16px', fontSize: '16px', marginLeft: '-3px' }} /> 
            }}
          >
            <Input
                suffix={
                  <BiSearch />  
                }
              />
          </AutoComplete>
        </div>    
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
