'use client'
import React, { useEffect, useState } from 'react';
import MapContainer from '@/components/MapContainer';
import List from '@/components/List';
import Search from '@/components/Search';
import Filter from '@/components/Filter';
import JoinWechat from '@/components/JoinWechat';
import HomePreviewCard from '@/components/HomePreviewCard';
import { ListType } from '@/types';
import { HAOSHIYOU_REQ_URL, debugMode, mockImgMode } from '@/constants';
import { TfiViewListAlt } from 'react-icons/tfi';
import { LuMapPin } from 'react-icons/lu';
import _get from 'lodash/get';
import { splitListItems, randomSetupImg, aggregatePost } from '@/helper';

import styles from './index.module.css';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cachedData, setCachedData] = useState<ListType[]>([]);
  const [listData, setListData] = useState<ListType[]>([]);
  const [mouseoverId, setMouseoverId] = useState<string>('');
  const [mouseClickedId, setMouseClickedId] = useState<string>('');
  const [toogleLayout, setToogleLayout] = useState<string>('list');
  const [wechatModalVisibility, setWechatModalVisibility] = useState(false);
  const [searchDropdownVisibility, setSearchDropdownVisibility] = useState(false);
  const [searchFilter, setSearchFilter] = useState({});
  const [searchStr, setSearchStr] = useState('');
  const [enableScrollSplit, setEnableScrollSplit] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${HAOSHIYOU_REQ_URL}?size=-1`)
    .then(x => x.json()).then((x) => {
      if (mockImgMode) x.forEach((x: any) => randomSetupImg(x));
      const filterObj = aggregatePost(x);
      setSearchFilter(filterObj);
      setCachedData(splitListItems(x, 0)[1]);
      const [initialListItems, restListItems] = splitListItems(x, 100);
      setListData(initialListItems);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchStr === '') {
      setCachedData(splitListItems(cachedData, 0)[1]);
      const [initialListItems, restListItems] = splitListItems(cachedData, 100);
      setListData(initialListItems);
      setEnableScrollSplit(true);
      return;
    }
    if (cachedData.length > 0) {
      setEnableScrollSplit(false);
      const filteredList = cachedData.filter((each) => {
        const cityStr = _get(each, 'addressCity', '');
        const zipcodeStr = _get(each, 'addressZipcode', '');
        return [cityStr.toLowerCase(), zipcodeStr.toLowerCase()].includes(searchStr.toLowerCase());
      });
      setListData(filteredList);
    }
  }, [searchStr]);

  const onScrollBottom = (uid: string) => {
    if (!enableScrollSplit) return;
    const idx = cachedData.findIndex((each: ListType) => each?.uid === uid);
    let newListItems = [];
    if (idx) {
      if (idx > 50) {
        const startIdx = Math.max(0, idx - 50);
        const endIdx = Math.min(idx + 50, cachedData.length);
        newListItems = cachedData.slice(startIdx, endIdx);
      } else {
        newListItems = cachedData.slice(0, 100);
      }
      setListData(newListItems);
    }
  };

  const onModalClosed = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWechatModalVisibility(false);
  };

  return (
    <div className={styles.container}> 
      {debugMode && (
        <div className={styles.mouseActionInfo}>
          ---
          {!!mouseoverId && `Mouse Over @ ${mouseoverId}`}
          --- 
          {!!mouseClickedId && `Mouse Click @ ${mouseClickedId}`}
          ---
        </div>
      )}
      {toogleLayout === 'map' && (
            <Filter toogleLayout={toogleLayout} />
      )}
      <JoinWechat visible={wechatModalVisibility} onCancel={onModalClosed} /> 
      <div className={styles.actionContainer}>
        <div className={styles.logo}>
          <div className={styles.logoIcon} />
          {/* <div className={styles.logoText}>
            好室友
          </div> */}
        </div>
        <div className={styles.searchContainer}>
          <Search 
            name='Search' 
            setWechatModalVisibility={setWechatModalVisibility} 
            searchDropdownVisibility={searchDropdownVisibility} 
            searchFilter={searchFilter}
            searchStr={searchStr}
            setSearchStr={setSearchStr}
          />
        </div>    
        <div className={styles.toggleContainer}>
          {toogleLayout === 'map' && <TfiViewListAlt onClick={() => setToogleLayout('list')} />}
          {toogleLayout === 'list' && (
           <span className={styles.iconMap}>
            <LuMapPin onClick={() => setToogleLayout('map')} />
           </span> 
          )
        }
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.listContainer} style={{display: toogleLayout === 'list' ? 'grid' : 'none'}}>
          {toogleLayout === 'list' && (
            <div className={styles.filterContainer}>
              <Filter toogleLayout={toogleLayout} />
            </div>
          )}
          <List 
            name='List'
            loading={loading} 
            listData={listData}
            mouseoverId={mouseoverId}
            setMouseoverId={setMouseoverId}
            mouseClickedId={mouseClickedId}
            setMouseClickedId={setMouseClickedId}
            onScrollBottom={onScrollBottom}
            setWechatModalVisibility={setWechatModalVisibility}
          />
        </div>
        <div className={styles.mapContainer}>
          <MapContainer 
            name='MapContainer' 
            loading={loading} 
            listData={listData}
            mouseoverId={mouseoverId}
            setMouseoverId={setMouseoverId}
            mouseClickedId={mouseClickedId}
            setMouseClickedId={setMouseClickedId}
          />
        </div>
        <div className={styles.homePreviewCard}>
          <HomePreviewCard name='HomePreviewCard' />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
