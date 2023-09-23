import React, { useEffect, useState, useRef } from 'react';
import { Popover, Skeleton } from 'antd';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import ListItem from '@/components/ListItem';
import BackToTop from '@/components/BackToTop';
import { ListType } from '@/types';
import { UserOutlined, ContactsOutlined } from '@ant-design/icons';
import { GoLinkExternal } from 'react-icons/go';

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
  const { loading, listData, mouseoverId, setMouseoverId, mouseClickedId, setMouseClickedId, onScrollBottom, setWechatModalVisibility } = props;
  const scrollListRef = useRef<any>();
  const [popoverSelectItem, setPopoverSelectItem] = useState({});
  const [contactPopoverVisibility, setContactPopoverVisibility] = useState(false);
  const [popoverLeft, setPopoverLeft] = useState(0);
  const [popoverTop, setPopoverTop] = useState(0);

  const resetPopover = () => {
    setContactPopoverVisibility(false);
    setPopoverSelectItem({});
  };

  useEffect(() => {
    let markScrollEndFn = () => {};
    const ele = scrollListRef.current;
    if (ele) {
      const isNotScrollable = ele.scrollHeight === ele.clientHeight;
      if(isNotScrollable) {
        return;
      }
      markScrollEndFn = _debounce(() => {
        if(ele) {
          const isEnd = ele.scrollHeight - Math.round(ele.scrollTop) <= ele.clientHeight;
          if(isEnd) {
            const lastItemId = _get(listData, `${listData.length - 1}.uid`, '');
            if(lastItemId) {
              onScrollBottom(lastItemId);  
            }
          }
        }
      }, 600);
      ele.addEventListener('scroll', markScrollEndFn);
    }
    return () => {
      if (ele) {
        ele.removeEventListener('scroll', markScrollEndFn);
      }
    }
  });

  useEffect(() => {
    const ele = scrollListRef.current;
    if (ele) {
      ele.addEventListener('scroll', resetPopover);
    }
    return () => {
      if (ele) {
        ele.removeEventListener('scroll', resetPopover);
      }
    }
  });

  const popoverOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const popoverContent = (item: any) => {
    const hsyGroupNick = _get(item, 'hsyGroupNick', '');
    const wechatId = _get(item, 'wechatId', '--') || '--';
    const email = _get(item, 'email', '--');
    return (
      <div className={styles.popoverContent} onClick={popoverOnClick}>
        <div className={styles.userIcon}>
          <UserOutlined />
        </div>
        <div className={styles.contact}>
          <div className={styles.contactLine}>
            WeChat: {wechatId}
          </div>
          <div className={styles.contactLine}>
            Email: {email}
          </div>
          <div className={styles.contactLine} onClick={() => setWechatModalVisibility(true)}>
            <span className={styles.title}>
              From:
            </span>
            <span className={styles.text}>
              <span className={styles.groupText}>
                {hsyGroupNick} 
              </span>
              <span className={styles.exLink}>
                <GoLinkExternal />
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const linkOnclick = (x: any) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();    
    const prevId = _get(popoverSelectItem, 'uid', '');
    if ((prevId !== '')) {
      resetPopover();
      return;
    } 
    let ele = e.target;
    const clsNames = e.target.className;
    if (clsNames.includes('hLinkText')) {
      ele = ele.parentElement;
    }
    const position = ele.getBoundingClientRect() || {};
    const left = _get(position, 'left', 0);
    const top = _get(position, 'top', 0);
    setPopoverLeft(left);
    setPopoverTop(top + 20);
    const result = listData.find(({ uid }) => uid === x.uid) || {};
    setPopoverSelectItem(result);
    setContactPopoverVisibility(true);
  };

  const popoverEle = contactPopoverVisibility && (
    <div className={styles.popoverEle} style={{ position: 'fixed', left: popoverLeft, top: popoverTop }}>
      <Popover 
        placement='bottom' 
        content={popoverContent(popoverSelectItem)} 
        destroyTooltipOnHide 
        autoAdjustOverflow 
        zIndex={1000}
        open
        defaultOpen
      >
      </Popover>
    </div>
  );

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
        linkOnclick={linkOnclick}
        resetPopover={resetPopover}
        popoverSelectItem={popoverSelectItem}
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
          {popoverEle}
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
