'use client'
import { Skeleton, Image, Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import { LeftOutlined, PhoneOutlined, MailOutlined, WechatOutlined, UserOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { HAOSHIYOU_REQ_URL, imgServiceDetailPrefix, mockImgMode } from '@/constants';
import _get from 'lodash/get';
import GoogleMapReact from 'google-map-react';
import MapMarker from '@/components/MapMarker';
import { priceTranslationFn, getDateDiff, randomSetupImg } from '@/helper';
import cls from 'classnames';

import styles from './HomeInfo.module.css';

interface Props {
  uid: string;
}

type MapProps = {
    center: {
        lat: number,
        lng: number,
      },
      zoom: number,
}

const defaultProps: MapProps = {
    center: {
      lat: 37.52666,
      lng: -122.08106,
    },
    zoom: 10.4
  };
const mockImgs = [
    "tsltbjpq5zg2ts5kdjce",
    "vj4ueilcvwxnjxplqfqa",
    "jlchj9zkzxb1mdjhzdft"
];

const HomeInfo: React.FC<Props> = (props) => {
  const { uid } = props;
  const [detailObj, setDetailObj] = useState<Object>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [contactDrawerVisibility, setContactDrawerVisibility] = useState<boolean>(false);
  const [mapProps, setMapProps] = useState<MapProps>(defaultProps);
  const title = _get(detailObj, 'title', '--');
  const lastUpdated = _get(detailObj, 'lastUpdated', '--');
  const imageUrls = _get(detailObj, 'imageIds', []);
  const location_lat = _get(detailObj, 'location_lat', 0);
  const location_lng = _get(detailObj, 'location_lng', 0);
  const price = _get(detailObj, 'price', '');
  const content = _get(detailObj, 'content', '');
  const contentList = content.split('\n');
  const amenityArray = _get(detailObj, 'amenityArray', []).join(',  ');
  const wechatId = _get(detailObj, 'wechatId', '--') || '--';
  const contactName = _get(detailObj, 'owner.name', '--');
  const contactEmail = _get(detailObj, 'owner.contactEmail', '--');
  const contactPhone = _get(detailObj, 'owner.contactPhone', '--');
  const imageUrlMapping = (imageId: string) => `${imgServiceDetailPrefix}${imageId}.jpg` || '';

  useEffect(() => {
    setLoading(true);
    fetch(`${HAOSHIYOU_REQ_URL}/${uid}`).then(x => x.json()).then((x) => {
        if (mockImgMode) randomSetupImg(x);
        setDetailObj(x);
        const location_lat = _get(x, 'location_lat', 0);
        const location_lng = _get(x, 'location_lng', 0);
        setMapProps({
            center: {
                lat: location_lat,
                lng: location_lng,
              },
              zoom: 10.4
        });
        setLoading(false);
    });
  }, []);

  const navOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/`;
  };

  const contactDrawerOnClose = (e: React.MouseEvent | React.KeyboardEvent) => {
    setContactDrawerVisibility(false);
  };

  const contactDrawer = (
    <Drawer
        placement='bottom'
        closable={false}
        onClose={contactDrawerOnClose}
        open={contactDrawerVisibility}
        key={uid}
        destroyOnClose
        height={300}
    >
        <div className={styles.mask}>
            <div className={styles.contactLines}>
                <div className={styles.contactLine}>contact@gmail.com</div>
                <div className={styles.contactLine}>发送邮件</div>
                <div className={styles.contactLine}>拨打电话</div>
                <div className={styles.contactLine}>复制号码</div>
                <div className={cls(styles.contactLine, styles.cancel)} onClick={contactDrawerOnClose}>取消</div>
            </div>
        </div>
    </Drawer>
  );
  const contactOnClick = () => {
    setContactDrawerVisibility(true);
  };

  const createMapOptions = () => {
    return {
      fullscreenControl: false,
      scrollwheel: false,
    };
  };

  return (
    <div className={styles.container}>
        {loading && <Skeleton active paragraph={{ rows: 30 }} />}
        {!loading && (
        <>
            <div className={styles.navBar} onClick={navOnClick}>
                <div className={styles.navBarIcon}>
                    <LeftOutlined />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.image}>
                    <Image.PreviewGroup>
                        {imageUrls.map((eachImg) => (
                            <Image 
                                key={eachImg}
                                width={200}
                                height={200}
                                src={imageUrlMapping(eachImg)}
                            />
                        ))}
                    </Image.PreviewGroup>
                </div>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.subTitle}>
                    {getDateDiff(lastUpdated) || '--'} -- 110人看过
                </div>
                <div className={styles.map}>
                    {location_lat && location_lng && (
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBMhjUXTNWE8oMeKFSOojf4FhBbbFRgS10' }}
                        defaultCenter={mapProps.center}
                        defaultZoom={mapProps.zoom}
                        options={createMapOptions}
                    >
                        <MapMarker
                            text={title}
                            lat={location_lat}
                            lng={location_lng}
                            price={price}
                            uid={uid}
                        />
                    </GoogleMapReact>
                    )}
                </div>
                <div className={styles.description}>
                    <div className={styles.descTitle}>
                        描述
                    </div>
                    <div className={styles.descContent}>
                        
                            {contentList.map((eachC) => (
                                <div className={styles.contentItem} key={eachC}>
                                    {eachC}
                                </div>
                            ))}
                        
                    </div>
                </div>
                {amenityArray.length > 0 && (
                    <div className={styles.amenity}>
                    <div className={styles.amenityTitle}>
                        设施／须知
                    </div>
                    <div className={styles.amenityItem}>
                        <span className={styles.amenityItemIcon}>
                            <CheckSquareOutlined />
                        </span>
                        {amenityArray}
                    </div>
                </div>
                )}
                <div className={styles.contact}>
                    <div className={styles.contactTitle}>
                        联系房东
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactItemIcon}>
                            <UserOutlined /> 
                        </span>
                        房东: {contactName}     
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactItemIcon}>
                            <MailOutlined />
                        </span>
                        邮箱: {contactEmail}     
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactItemIcon}>
                            <PhoneOutlined />
                        </span>
                        电话: {contactPhone}     
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactItemIcon}>
                            <WechatOutlined />
                        </span>
                        微信: {wechatId}     
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.price}>
                    {priceTranslationFn(price)}
                </div>
                <div className={styles.contactOwner} onClick={contactOnClick}>
                    联系房东
                </div>
                {contactDrawer}
            </div>
        </>
        )}
     
    </div>
  );
};

export default HomeInfo;
