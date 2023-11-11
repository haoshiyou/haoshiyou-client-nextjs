import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HomeInfo from '@/components/HomeInfo';
import { Metadata, ResolvingMetadata } from 'next';
import { HAOSHIYOU_REQ_URL } from '@/constants';

import styles from './index.module.css';

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

export async function generateMetadata(
{ params, searchParams }: Props,
parent: ResolvingMetadata
): Promise<Metadata> {
// read route params
const { id } = searchParams;
// fetch data
const product = { title: '' };
if (id) {
  const res = await fetch(`${HAOSHIYOU_REQ_URL}/${id}`).then((res) => res.json());
  product.title = res.title;
}

// optionally access and extend (rather than replace) parent metadata
// const previousImages = (await parent).openGraph?.images || []

return {
    title: product.title || '好室友™平台',
    viewport: { width: 390, userScalable: false },
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
}
}

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