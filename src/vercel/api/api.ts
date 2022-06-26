import type { VercelRequest, VercelResponse } from '@vercel/node';
import { StatusError } from "@/helpers";

export default function handler (req: VercelRequest, res: VercelResponse) {
  console.log(StatusError)
  res.status(200).send('Hello world')
}
