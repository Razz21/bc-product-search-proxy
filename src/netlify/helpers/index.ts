import { StatusError, corsHeaders } from "@/helpers";
import { HTTPMethods } from "@/types";
import type { AwsRequest, HTTPMethod } from "@/types";
import type { HandlerEvent, HandlerContext, Handler } from "@netlify/functions";

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
export const handleResponse = (result: unknown) => {
  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: corsHeaders,
  };
};

export const transformAwsEventToRequest = (event: HandlerEvent): AwsRequest => {
  return {
    ...event,
    query: event.queryStringParameters,
    method: event.httpMethod as HTTPMethod,
    url: event.path,
  };
};

export const corsMiddleware =
  (fn: Handler) => async (event: HandlerEvent, context: HandlerContext) => {
    if (event.httpMethod === HTTPMethods.OPTIONS) {
      return {
        statusCode: 200,
        body: "Hello, world!",
        headers: corsHeaders,
      };
    }
    return fn(event, context);
  };