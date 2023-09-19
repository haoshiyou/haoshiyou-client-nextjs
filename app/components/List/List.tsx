import React, { useEffect, useState, useRef } from 'react';
import { Layout, Row, Typography, Skeleton } from 'antd';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import ListItem from '@/components/ListItem';
import BackToTop from '@/components/BackToTop';
import { ListType } from '@/types';

import styles from './List.module.css';

interface Props {
  name: string;
  loading: boolean;
  listData: ListType[];
  mouseoverId: string;
  setMouseoverId: Function;
  mouseClickedId: string;
  setMouseClickedId: Function;
  onScrollBottom: Function;
  setWechatModalVisibility: Function;
}

const isBottomFn = (ele: HTMLDivElement): boolean => {
  return (ele.scrollHeight - ele.scrollTop) === ele.clientHeight;
};

const List: React.FC<Props> = (props) => {
  const { name, loading, listData, mouseoverId, setMouseoverId, mouseClickedId, setMouseClickedId, onScrollBottom, setWechatModalVisibility } = props;
  const scrollListRef = useRef<any>();
  useEffect(() => {
    let markScrollEndFn = () => {};
    const ele = scrollListRef.current;
    if (ele) {
      const isNotScrollable = ele.scrollHeight === ele.clientHeight;
      if(isNotScrollable) {
        return;
      }
      markScrollEndFn = () => {
        if(ele) {
          const isEnd = ele.scrollHeight - Math.round(ele.scrollTop) <= ele.clientHeight;
          if(isEnd) {
            const lastItemId = _get(listData, `${listData.length - 1}.uid`, '');
            if(lastItemId) {
              onScrollBottom(lastItemId);  
            }
          }
        }
      };
      ele.addEventListener('scroll', markScrollEndFn);
    }
    return () => {
      if (ele) {
        ele.removeEventListener('scroll', markScrollEndFn);
      }
    }
  });
  const listItems = listData.map((each: ListType) => {
    const uid = _get(each, 'uid', '--');
    return (
      <ListItem
        list={each}
        key={uid}
        uid={uid}
        mouseoverId={mouseoverId}
        setMouseoverId={setMouseoverId}
        mouseClickedId={mouseClickedId}
        setMouseClickedId={setMouseClickedId}
        setWechatModalVisibility={setWechatModalVisibility}
      />
    )
  });
  const onListLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    setMouseoverId('');
  }

  return (
    <div className={styles.container}>
      {loading && <div className={styles.loading}><Skeleton active /><Skeleton active /></div>}
      {!loading && (
        <div
          className={styles.listContainer}
          onMouseLeave={onListLeave}
          ref={scrollListRef}
          >
          {listItems}
          {/* <BackToTop 
            scrollRef={scrollListRef.current}
           /> */}
        </div>
      )}
    </div>
  );
};

export default List;
