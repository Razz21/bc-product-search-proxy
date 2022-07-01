import type { ServerlessRequest, HTTPMethod, AsyncHandler } from "../../types";
import { HTTPMethods } from "../../types";
import Joi, { ValidationError } from "joi";
import type { HandlerEvent, HandlerContext, HandlerResponse } from "@netlify/functions";
export class StatusError extends Error {
  statusCode?: number;
}

export const validateHttpMethod = (req: ServerlessRequest, validMethod: HTTPMethod = "GET") => {
  if (req.httpMethod.toLowerCase() !== validMethod.toLowerCase()) {
    const error = new StatusError(`${req.httpMethod} is not allowed!`);
    error.statusCode = 405;
    throw error;
  }
};

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "store-hash, api-version, Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Access-Control-Allow-Origin",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Credentials": "true",
  "access-control-request-headers": "content-type"
};

export const validateRequest = async (req: ServerlessRequest, requestValidator: Joi.Schema) => {
  try {
    const value = await requestValidator.validateAsync(req);
    return value;
  } catch (error) {
    const e = new StatusError(error.message)
    e.statusCode  = 400;
    throw e;
  }
};

export const handleError = (err: unknown) => {
  let statusCode: number, message: string;

  if (err instanceof StatusError) {
    ({ statusCode, message } = err);
  } else if (err instanceof Error) {
    message = err.message;
  }
  return {
    statusCode: statusCode || 500,
    body: JSON.stringify({ message: message || "Failed fetching data" }),
    headers: corsHeaders
  };
};

export const handleResponse = (result: unknown) => {
  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: corsHeaders
  };
};

export const corsMiddleware =
  (fn: AsyncHandler) =>
  async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
    if (event.httpMethod === HTTPMethods.OPTIONS) {
      return {
        statusCode: 200,
        headers: corsHeaders,
      };
    }
    return fn(event, context);
  };
