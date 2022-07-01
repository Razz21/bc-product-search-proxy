import type { HandlerContext, HandlerEvent, HandlerResponse } from "@netlify/functions";

export type AsyncHandler = (event: HandlerEvent, context: HandlerContext) => Promise<HandlerResponse>

export type ServerlessRequest = HandlerEvent & {
  httpMethod: string|HTTPMethod;
};

export enum HTTPMethods {
  "GET" = "GET",
  "POST" = "POST",
  "OPTIONS" = "OPTIONS",
  "PUT" = "PUT",
  "DELETE" = "DELETE",
  "HEAD" = "HEAD",
  "PATCH" = "PATCH",
  "CONNECT" = "CONNECT",
  "TRACE" = "TRACE",
}

export type HTTPMethod = keyof typeof HTTPMethods;
