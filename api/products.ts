import * as apiHandler from "./_endpoints";
import validator from "./_validation";
import {
  validateRequest,
  validateHttpMethod,
  handleError,
  corsMiddleware,
  handleResponse,
} from "./_helpers";

import { HTTPMethods } from "./_types";
import type { HandlerEvent, HandlerContext } from "@netlify/functions";

const handler = corsMiddleware(
  async (event: HandlerEvent, context: HandlerContext) => {
    try {
      validateHttpMethod(event, HTTPMethods.GET);
      await validateRequest(event, validator.products);

      const result = await apiHandler.find(event);
      return handleResponse(result);
    } catch (err) {
      return handleError(err);
    }
  }
);

export { handler };
