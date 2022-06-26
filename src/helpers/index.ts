import type { VercelApiHandler, VercelRequest, VercelResponse } from '@vercel/node';
import type { ServerlessRequest, HTTPMethod, AwsRequest } from '@/types';
import Joi from "joi";

export class StatusError extends Error {
  statusCode?: number;
}

export const validateHttpMethod = (req: ServerlessRequest, validMethod: HTTPMethod = "GET") => {
  if (req.method !== validMethod) {
    const error = new StatusError(`${req.method} is not allowed!`)
    error.statusCode = 405
    throw error
  }
}

export const corsHeaders = {
  "access-control-allow-origin": "*",
  'Access-Control-Allow-Headers': "store-hash, api-version, Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Access-Control-Allow-Origin",
  'Access-Control-Allow-Methods': 'GET, POST',
  'Access-Control-Allow-Credentials': "true"
}

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
  return await fn(req, res)
}

export const validateRequest = async (req: AwsRequest, requestValidator: Joi.Schema) => {
  const { error } = await requestValidator.validate(req);
  if (error) {
    (error as StatusError).statusCode = 400;
    throw error;
  }
}
