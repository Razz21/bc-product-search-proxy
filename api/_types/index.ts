import type { HandlerEvent } from "@netlify/functions";

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

type BigCommerceItem = {
  id: number,
  name: string,
  primary_image?: {
    url_standard: string,
    [key: string]: unknown
  }
  [key: string]: unknown
}

type BigCommerceMeta = {
  pagination: {
    count: number;
    current_page: number
    links: {
      current: string
      next: string
    }
    per_page: number
    too_many: boolean
    total: number
    total_pages: number
  }
}

export type BigCommerceResponse = {
  data: BigCommerceItem[],
  meta: BigCommerceMeta
}
