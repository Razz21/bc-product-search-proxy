import * as apiHandler from "~/src/_endpoints";
import validator from "~/src/_validation";
import {
  validateRequest,
  validateHttpMethod,
  handleError,
  corsMiddleware,
  handleResponse,
} from "~/src/_helpers";

import { HTTPMethods, AsyncHandler } from "~/types";

const handler: AsyncHandler = corsMiddleware(
  async (event, context) => {
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
