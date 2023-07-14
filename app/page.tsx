import React from 'react';
import { HomeDetail } from './components/HomeDetail/HomeDetail';
import Image from 'next/image'

import { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { id } = searchParams;
  // fetch data
  const product = { title: '' };
  if (id) {
    const res = await fetch(`https://haoshiyou-server-prod.herokuapp.com/api/HsyListings/${id}`).then((res) => res.json());
    product.title = res.title;
  }
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.title || '好室友™平台',
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

export default function Home() {
  return (
    <div>
      <HomeDetail />
    </div>
  );
}
