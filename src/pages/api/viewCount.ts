import { getPrivateClient } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = await getPrivateClient().rpc('increment_views', {
      page_slug: req.body.slug,
    });

    console.log('Success data ', data);
    return res.status(200).send('Success');
  } else {
    console.log('error  Invalid request method');
    return res.status(400).send('Invalid request method');
  }
}
