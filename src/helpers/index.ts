import type { ServerlessRequest, HTTPMethod, AwsRequest } from "@/types";
import Joi, { ValidationError } from "joi";

export class StatusError extends Error {
  statusCode?: number;
}

export const validateHttpMethod = (
  req: ServerlessRequest,
  validMethod: HTTPMethod = "GET"
) => {
  if (req.method !== validMethod) {
    const error = new StatusError(`${req.method} is not allowed!`);
    error.statusCode = 405;
    throw error;
  }
};

export const corsHeaders = {
  "access-control-allow-origin": "*",
  "Access-Control-Allow-Headers":
    "store-hash, api-version, Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Access-Control-Allow-Origin",
  "Access-Control-Allow-Methods": "GET, POST",
  "Access-Control-Allow-Credentials": "true",
};

export const validateRequest = async (
  req: AwsRequest,
  requestValidator: Joi.Schema
) => {
  const { error } = await requestValidator.validate(req);
  if (error) {
    (error as ValidationError as StatusError).statusCode = 400;
    throw error;
  }
};

export const handleError = (err: unknown) => {
  let statusCode, message;

  if (err instanceof StatusError) {
    ({ statusCode, message } = err);
  } else if (err instanceof Error) {
    message = err.message;
  }
  return {
    statusCode: statusCode || 500,
    body: JSON.stringify({ message: message || "Failed fetching data" }),
    headers: corsHeaders,
  };
};
