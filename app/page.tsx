import React from 'react';
import App from '@/pages/App';
import { Metadata, ResolvingMetadata } from 'next';
 
export async function generateMetadata(): Promise<Metadata> {
 
  return {
    title: '好室友™平台',
    viewport: { width: 390, userScalable: false },
  }
}

export default function Home() {
  return (
    <App />
  );
}
