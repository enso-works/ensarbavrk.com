import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
const PUBLIC_FILE = /\.(.*)$/;

export const middleware = async (req: NextRequest, event: NextFetchEvent) => {
  const pathname = req.nextUrl.pathname;

  const isPageRequest =
    !PUBLIC_FILE.test(pathname) && !pathname.startsWith('/api');

  const sendAnalytics = async () => {
    const slug = pathname.slice(pathname.indexOf('/')) || '/';

    if (!slug.includes('posts')) return;

    const URL = `${
      process.env.NODE_ENV === 'production'
        ? 'https://enso.works'
        : 'http://localhost:3000'
    }/api/viewCount`;

    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      });

      if (!res.ok) {
        throw new Error(`Analytics failed with status: ${res.status}`);
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  // Only send analytics in production and for page requests
  if (process.env.NODE_ENV === 'production' && isPageRequest) {
    event.waitUntil(sendAnalytics());
  }

  return NextResponse.next();
};
