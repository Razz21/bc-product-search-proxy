import * as apiHandler from "./_endpoints";
import validator from "./_validation";
import {
  validateRequest,
  validateHttpMethod,
  handleError,
  corsMiddleware,
  handleResponse,
} from "./_helpers";

import { HTTPMethods, AsyncHandler } from "./_types";

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
