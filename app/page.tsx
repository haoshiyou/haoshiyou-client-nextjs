import React from 'react';
import App from '@/pages/App';
import { Metadata, ResolvingMetadata } from 'next';
import { HAOSHIYOU_REQ_URL } from '@/constants';
 
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
  const metadaTitle = product.title || '好室友™平台';
  const metadaKeyword = product.title || '好室友™平台';
  return {
      title: metadaTitle,
      viewport: { width: 390, userScalable: false },
      keywords: metadaKeyword,
      openGraph: {
          title: metadaTitle,
          description: metadaKeyword,
          images: 'https://haoshiyou-client-nextjs.vercel.app/_next/static/media/haoshiyou_logo.5825016d.svg',
          url: 'https://haoshiyou.org/',
    },
  }
  }

export default function Home() {
  return (
    <App />
  );
}
