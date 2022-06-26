import * as apiHandler from "@/endpoints";
import validator from "@/validation";
import {
  validateRequest,
  validateHttpMethod,
  handleError,
} from "@/helpers";
import {
  corsMiddleware,
  transformAwsEventToRequest,
  handleResponse,
} from '../helpers'
import { HTTPMethods } from "@/types";
import type { HandlerEvent, HandlerContext } from "@netlify/functions";

const handler = corsMiddleware(
  async (event: HandlerEvent, context: HandlerContext) => {
    try {
      const req = transformAwsEventToRequest(event);

      validateHttpMethod(req, HTTPMethods.GET);
      await validateRequest(req, validator.products);

      const result = await apiHandler.find(req);
      return handleResponse(result);
    } catch (err) {
      return handleError(err);
    }
  }
);

export { handler };
