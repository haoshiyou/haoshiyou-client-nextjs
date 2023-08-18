'use client'
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { SortAscendingOutlined, FilterOutlined, DownOutlined } from '@ant-design/icons';
import cls from 'classnames';
import qrImg from '@/assets/images/haoshiyou-bot-wecom.jpeg';
import message1 from '@/assets/images/message_01.svg';
import message2 from '@/assets/images/message_02.svg';

import styles from './JoinWechat.module.css';

interface Props {
    visible: boolean;
    onCancel?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

const JoinWechat: React.FC<Props> = (props) => {
    const { visible, onCancel = () => {} } = props;
    const [currIndex, setCurrentIndex] = useState('intro');
    const modalTitle = (
        <div className={styles.modalTitle}>
            加好室友微信群
        </div>
    );

    const stepsContent = (
        <>
            <div className={cls(styles.stepsContainer, styles.alignCenter)}>
                <div className={styles.stepText}>
                    STEP. 1
                </div>
                <div className={styles.stepTitle}>
                    扫码添加好室友小助手为好友
                </div>
                <div className={styles.qrImg}>
                    <img alt="haoshiyou-bot-wecom" className={styles.qrImg} src={qrImg.src} width={155} height={155} />
                </div>
                <br />
                <div className={styles.stepText}>
                    STEP. 2
                </div>
                <div className={styles.stepTitle}>
                    通过小助手加入好室友微信群
                </div>
                <br />
                <div className={styles.stepIntro}>
                    发送南湾西/南湾东/东湾/中半岛/三番/西雅图，
                </div>
                <div className={styles.stepIntro}>
                    好室友小助手会邀请你进入相应的微信群
                </div>
            </div>
            <div className={styles.chatContainer}>
                <div className={styles.chatMessage1}>
                        <img alt="haoshiyou-bot-wecom" className={styles.qrImg} src={message1.src} />
                </div>
                <div className={styles.chatMessage2}>
                        <img alt="haoshiyou-bot-wecom" className={styles.qrImg} src={message2.src} />
                </div>
            </div>
        </>
        
    );

    const joinBtnOnClick = () => {
        setCurrentIndex('steps');
    };

    const modalContent = (
        <div className={styles.modalContent}>
            <div className={styles.joinWechatDesc1}>
                <div className={styles.wechatIcon} />
            </div>
            <div className={styles.joinWechatDesc1}>
                想获取最新房源和找室友信息吗
            </div>
            <div className={styles.joinWechatDesc1}>
                加入好室友微信群吧!
            </div>
            <div className={styles.joinWechatBtnContainer}>
                <div className={styles.joinWechatBtn} onClick={joinBtnOnClick}>
                    点此添加好室友微信群
                </div>
            </div>
        </div>
    );
  return (
    <Modal
        title={modalTitle}
        open={visible}
        width={600}
        footer={null}
        onCancel={onCancel}
    >
        {currIndex === 'intro' && modalContent}
        {currIndex === 'steps' && stepsContent}
    </Modal>
  );
};

export default JoinWechat;
