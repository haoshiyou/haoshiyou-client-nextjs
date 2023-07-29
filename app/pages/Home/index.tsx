'use client'
import React, { useEffect, useState } from 'react';
import MapContainer from '@/components/MapContainer';
import List from '@/components/List';
import Search from '@/components/Search';
import Filter from '@/components/Filter';
import { ListType } from '@/types';
import { HAOSHIYOU_REQ_URL } from '@/constants';
import { UnorderedListOutlined, AimOutlined } from '@ant-design/icons';
import _get from 'lodash/get';

import styles from './index.module.css';

const debugMode = false;

const splitListItems = (listData: ListType[], gap: number) => {
  const sortedData = listData
  .sort((pre: ListType, next: ListType) => {
      const preTime = _get(pre, 'lastUpdated', '');
      const nextTime = _get(next, 'lastUpdated', '');
      return new Date(preTime).getTime() < new Date(nextTime).getTime() ? 1 : -1;
  });
  return [sortedData.slice(0, gap), sortedData.slice(gap)];
};

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cachedData, setCachedData] = useState<ListType[]>([]);
  const [listData, setListData] = useState<ListType[]>([]);
  const [mouseoverId, setMouseoverId] = useState<string>('');
  const [mouseClickedId, setMouseClickedId] = useState<string>('');
  const [toogleLayout, setToogleLayout] = useState<string>('list');

  useEffect(() => {
    setLoading(true);
    fetch(HAOSHIYOU_REQ_URL)
    .then(x => x.json()).then((x) => {
      setCachedData(splitListItems(x, 0)[1]);
      const [initialListItems, restListItems] = splitListItems(x, 100);
      setListData(initialListItems);
      setLoading(false);
    });
  }, []); 
  const onScrollBottom = (uid: string) => {
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
      <div className={styles.actionContainer}>
        <div className={styles.searchContainer}>
          <Search name='Search' />
        </div>
        <div className={styles.filterContainer}>
          <Filter name='Filter' />
        </div>
        <div className={styles.toggleContainer}>
          {toogleLayout === 'list' && <UnorderedListOutlined onClick={() => setToogleLayout('map')} />}
          {toogleLayout === 'map' && <AimOutlined onClick={() => setToogleLayout('list')} />}
        </div>
      </div>
        
      <div className={styles.contentContainer}>
        <div className={styles.listContainer} style={{display: toogleLayout === 'list' ? 'grid' : 'none'}}>
          <List 
            name='List'
            loading={loading} 
            listData={listData}
            mouseoverId={mouseoverId}
            setMouseoverId={setMouseoverId}
            mouseClickedId={mouseClickedId}
            setMouseClickedId={setMouseClickedId}
            onScrollBottom={onScrollBottom}
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
      </div>
    </div>
  );
};

export default HomePage;
