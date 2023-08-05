import { Popover } from 'antd';
import React from 'react';
import _get from 'lodash/get';
import cls from 'classnames';
import { priceTranslationFn, getDateDiff } from '@/helper';
import { UserOutlined, ContactsOutlined } from '@ant-design/icons';

import styles from './ListItem.module.css';

export interface Props {
    list: object;
    uid: string;
    mouseoverId: string;
    setMouseoverId: Function;
    mouseClickedId: string;
    setMouseClickedId: Function;
}

const ListItem: React.FC<Props> = (props) => {
  const { list = {}, uid, mouseoverId, setMouseoverId, mouseClickedId, setMouseClickedId } = props;
  const name = _get(list, 'name', '--');
  const content = _get(list, 'content', '--');
  const price = _get(list, 'price', '--');
  const addressCity = _get(list, 'addressCity', '--');
  const lastUpdatedTime = _get(list, 'lastUpdated', '');
  const ownerId = _get(list, 'ownerId', '');
  const wechatId = _get(list, 'wechatId', '--') || '--';
  const email = _get(list, 'email', '--');
  const lastUpdated = lastUpdatedTime ? getDateDiff(lastUpdatedTime): '--';
  const imageId = _get(list, 'imageIds[0]', '');
  const imageUrl = imageId ? `http://res.cloudinary.com/xinbenlv/image/upload/c_fill,g_north,w_400,h_300,g_center/${imageId}.jpg`: '';
  const isMarkerMouseover = uid === mouseoverId;
  const isMarkerClicked = uid === mouseClickedId;
  const onListItemMouseover = (e: React.MouseEvent) => {
    e.preventDefault();
    setMouseoverId(uid);
  };
  const onListItemMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    setMouseoverId('');
  };
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMouseClickedId((prevUid: string)=> {
        if (prevUid === uid) {
            return ''
        }
        return uid;
    });
  };
  const linkOnclick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // window.location.href = `/?id=${uid}`;
  };
  const itemOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/?id=${uid}`;
  };

  const popoverContent = (
    <span className={styles.popoverContent}>
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
      </div>
    </span>
  );

  return (
    <div 
      className={cls(styles.container, (isMarkerMouseover || isMarkerClicked) && styles.onHover)} 
      onMouseOver={onListItemMouseover}
      onMouseLeave={onListItemMouseLeave}
      onClick={onClick}
      list-uid={uid}
      >
      <div className={styles.gridContainer} onClick={itemOnClick}>
        <div className={styles.title}>
          {content}
        </div>
        <div className={styles.locationAndDate}>
          {addressCity} {lastUpdated}
        </div>
        <div className={styles.pricingAndLink}>
          <div className={styles.pricing}>
            {priceTranslationFn(price)}
          </div>
          <Popover 
            placement='bottom' 
            trigger='click' 
            content={popoverContent} 
            destroyTooltipOnHide 
            autoAdjustOverflow 
          >
            <div className={styles.hLink} onClick={linkOnclick}>
              <ContactsOutlined />
              <span className={styles.hLinkText}>Contact</span>
            </div>
          </Popover>
        </div>
      </div>
      <div className={styles.picContainer}>
        {imageId && (
        <img className={styles.img} 
          src={imageUrl}
          alt="img"
        />)}
      </div>
    </div>
  );
};

export default ListItem;
