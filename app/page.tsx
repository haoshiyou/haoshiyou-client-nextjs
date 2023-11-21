import React from 'react';
import App from '@/pages/App';
import { Metadata, ResolvingMetadata } from 'next';
import { HAOSHIYOU_REQ_URL, imgServicePrefix } from '@/constants';
import _get from 'lodash/get';

const logoImageUrl = 'https://haoshiyou-client-nextjs.vercel.app/_next/static/media/haoshiyou_logo.5825016d.svg';
 
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
  const product = { title: '', imageIds: [] };
  if (id) {
    const res = await fetch(`${HAOSHIYOU_REQ_URL}/${id}`).then((res) => res.json());
    product.title = res.title;
    product.imageIds = res.imageIds;
  }
  
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
  const metadaTitle = product.title || '好室友™平台';
  const metadaKeyword = product.title || '好室友™平台';
  const imageIds = _get(product, 'imageIds', []);
  const metadataImageUrl = imageIds[0] ? `${imgServicePrefix}${imageIds[0]}.jpg` : logoImageUrl;
  return {
      title: metadaTitle,
      viewport: { width: 390, userScalable: false },
      keywords: metadaKeyword,
      openGraph: {
          title: metadaTitle,
          description: metadaKeyword,
          images: metadataImageUrl,
          url: 'https://haoshiyou.org/',
    },
  }
  }

export default function Home() {
  return (
    <App />
  );
}
