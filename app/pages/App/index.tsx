'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Home from '@/pages/Home';
import HomeDetail from '@/pages/HomeDetail';

import styles from './index.module.css';

const App: React.FC = () => {
    const searchParams = useSearchParams();
    const uid = searchParams.get('id') || '';

    return (
        <div>
            {uid === '' && (
                <Home />
            )}
            {uid !== '' && (
                <HomeDetail />
            )}
        </div>
    )
}

export default App;