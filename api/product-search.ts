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
      validateHttpMethod(event, HTTPMethods.POST);
      await validateRequest(event, validator.productSearch);

      const result = await apiHandler.search(event);
      return handleResponse(result);
    } catch (err) {
      return handleError(err);
    }
  }
);

export { handler };
