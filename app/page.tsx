'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Always redirect to exchange (the main luxe chat interface)
    router.push('/exchange');
  }, [router]);

  return null;
}
