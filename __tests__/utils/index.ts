import { HandlerContext, HandlerEvent } from "@netlify/functions";
import { BigCommerceResponse, ResponseBody } from "~/types";
import { StatusError } from '~/src/_helpers';

export const getEvent = (options: Partial<HandlerEvent> = {} ) =>  options as HandlerEvent;
export const getContext = (options: Partial<HandlerContext> = {}) =>  options as HandlerContext;

export const createStatusError = (msg: string): StatusError => {
  const e = new StatusError(msg);
  e.statusCode = 400;
  return e
}

export const fetchResponse: BigCommerceResponse = {
  data: [
    { id: 1, name: "product 1", primary_image: { url_standard: "image-url 1" }},
    { id: 2, name: "product 2", primary_image: { url_standard: "image-url 2" }},
  ],
  meta: {
    pagination: {
      count: 2,
      current_page: 1,
      links: {
        current: 'current',
        next: "next"
      },
      per_page: 5,
      too_many: false,
      total: 2,
      total_pages: 1
    }
  }
}
export const responseBody: ResponseBody = {
  items: [
    {
      id: 1,
      name: "product 1",
      image: "image-url 1"
    },
    {
      id: 2,
      name: "product 2",
      image: "image-url 2"
    },
  ],
  page: {
    curPage: 1,
    numPages: 1,
    total: 2
  }
}
