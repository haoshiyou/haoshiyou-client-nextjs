'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HomeInfo from '@/components/HomeInfo';

import styles from './index.module.css';


const HomePage: React.FC = () => {
    const searchParams = useSearchParams();
    const uid = searchParams.get('id') || '';

    return (
        <div className={styles.container}>
            <HomeInfo
                uid={uid}
             />
        </div>
    );
};

export default HomePage;