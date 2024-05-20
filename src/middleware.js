import { NextResponse } from 'next/server';
const PUBLIC_FILE = /\.(.*)$/;

export const middleware = async (req, event) => {
  const pathname = req.nextUrl.pathname;

  const isPageRequest =
    !PUBLIC_FILE.test(pathname) && !pathname.startsWith('/api');

  const sendAnalytics = async () => {
    const slug = pathname.slice(pathname.indexOf('/')) || '/';

    if (!slug.includes('posts')) return NextResponse.next();
    const URL =
      process.env.NODE_ENV === 'production'
        ? 'https:/enso.works/api/viewCount'
        : 'http://localhost:3000/api/viewCount';
    const res = await fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug,
      }),
    });

    if (res.status !== 200) {
      console.error('Failed to send analytics', res);
    }
  };

  // event.waitUntil is the real magic here:
  // it won't wait for sendAnalytics() to finish before continuing the response,
  // so we avoid delaying the user.
  if (isPageRequest) event.waitUntil(sendAnalytics());
  return NextResponse.next();
};
