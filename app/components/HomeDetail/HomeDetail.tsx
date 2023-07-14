'use client'
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

export const HomeDetail = () => {
    const searchParams = useSearchParams();
    const uid = searchParams.get('id');
    useEffect(() => {
        console.log('searchParams', searchParams, searchParams.get('id'));    
    }, []);
    return (
        <div>
            Home Detail {uid}
        </div>
    )
};

