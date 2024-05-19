import { privateClient } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = await privateClient.rpc('increment_views', { page_slug: req.body.slug });
    console.log('data ', data)
    return res.status(200).send('Success');
  } else {
    return res.status(400).send('Invalid request method');
  }
}
