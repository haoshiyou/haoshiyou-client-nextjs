import React, { useEffect, useState, useRef } from 'react';
import { SearchBar, Popup } from '@nutui/nutui-react';
import { IoIosAddCircle } from "react-icons/io";
import _get from 'lodash/get';
import { AiOutlineClose } from 'react-icons/ai';

import styles from './Search.module.css';

interface Props {
  name: string;
  setWechatModalVisibility: Function;
  searchFilter: Object;
  searchStr: string;
  setSearchStr: Function;
}

const Search: React.FC<Props> = (props) => {
  const { setWechatModalVisibility, searchFilter, searchStr, setSearchStr } = props;
  const [cityOptions, setCityOptions] = useState([]);
  const [zipcodeOptions, setZipcodeOptions] = useState([]);
  const [inputSearchStr, setInputSearchStr] = useState('');
  const [searchDropdownVisibility, setSearchDropdownVisibility] = useState(false);
  const containerRef = useRef(null);

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
      label: '城市',
      options: cityOptions,
    },
    {
      label: '邮编',
      options: zipcodeOptions,
    },
  ];
  
  

  const dropdownOnSearch = (x: string) => {
    const city = _get(searchFilter, 'city', []);
    const filteredCity = city.filter((eachC: string) => eachC.toLowerCase().includes(x.toLowerCase()));
    setCityOptions(filteredCity);
    const zipcode = _get(searchFilter, 'zipcode', []);
    const filteredZipcode = zipcode.filter((eachC: string) => eachC.toLowerCase().includes(x.toLowerCase()));
    setZipcodeOptions(filteredZipcode);
    setInputSearchStr(x);
  };

  const dropdownOnSelect = (x: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchStr(x);
    setInputSearchStr(x);
    reloadFilters();
    setSearchDropdownVisibility(false);
  }

  const dropdownOnClear = () => {
    setSearchStr('');
    setInputSearchStr('');
    reloadFilters();
  }

  const searchOnFocusFn = (x: any) => {
    setSearchDropdownVisibility(true);
  };
 
  return (
    <div className={styles.title} ref={containerRef}>
      <div className={styles.searchBox}>
        <div className={styles.autoComplete}>
          <SearchBar 
            placeholder="搜索 城市名， 邮编" 
            onInputClick={searchOnFocusFn}
            onChange={dropdownOnSearch}
            onClear={dropdownOnClear}
            value={inputSearchStr}
          />
          {searchDropdownVisibility && (
            <div className={styles.searchDropdown}>
              <div 
                className={styles.header}
              >
                <div 
                  className={styles.closeBtn}
                  onClick={() => setSearchDropdownVisibility(false)}
                >
                  <AiOutlineClose />
                </div>
              </div>
              <div className={styles.searchItemContainer}>
                {options.map((each) => {
                  return (
                    <>
                      <div className={styles.label} key={each.label}>
                          {each.label}
                        </div>
                        {
                          each.options.map((eachO) => {
                            return (
                              <div 
                                key={eachO}
                                className={styles.options} 
                                onClick={dropdownOnSelect(eachO)}
                              >
                                {eachO}
                              </div>
                            )
                          })
                        }
                    </>
                  )
                })}
              </div>
            </div>
          )}
        </div>    
      </div>
      <div className={styles.newHome}>
        <div className={styles.plusIcon} onClick={() => setWechatModalVisibility(true)}>
          <IoIosAddCircle />
          <span className={styles.newHomeText}>
            发布
          </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
