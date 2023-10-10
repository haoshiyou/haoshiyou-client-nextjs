'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Home from '@/pages/Home';
import HomeDetail from '@/pages/HomeDetail';
import Script from 'next/script'

import styles from './index.module.css';

const App: React.FC = () => {
    const searchParams = useSearchParams();
    const uid = searchParams.get('id') || '';

    return (
        <>
            {uid === '' && (
                <Home />
            )}
            {uid !== '' && (
                <HomeDetail />
            )}

            <div style={{display: 'none' }}>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-55311687-4" />
            <Script id="google-analytics">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'UA-55311687-4');
                `}
            </Script>
            </div>
        </>

    )
}

export default App;