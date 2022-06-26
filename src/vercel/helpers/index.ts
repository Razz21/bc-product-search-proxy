import type { VercelApiHandler, VercelRequest, VercelResponse } from '@vercel/node';
import { corsHeaders } from '@/helpers'

export const allowCors = (fn: VercelApiHandler) => async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', "true")
  res.setHeader('Access-Control-Allow-Origin', corsHeaders["access-control-allow-origin"])
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', corsHeaders["Access-Control-Allow-Methods"])
  res.setHeader(
    'Access-Control-Allow-Headers',
    corsHeaders["Access-Control-Allow-Headers"]
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return fn(req, res)
}
