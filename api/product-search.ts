import * as apiHandler from "../src/_endpoints";
import validator from "../src/_validation";
import {
  validateRequest,
  validateHttpMethod,
  handleError,
  corsMiddleware,
  handleResponse,
  decodeBodyString,
} from "../src/_helpers";

import { HTTPMethods, AsyncHandler } from "../types";

const handler: AsyncHandler = corsMiddleware(async (event, context) => {
  try {
    validateHttpMethod(event, HTTPMethods.POST);
    decodeBodyString(event);
    await validateRequest(event, validator.productSearch);

    const result = await apiHandler.search(event);
    return handleResponse(result);
  } catch (err) {
    return handleError(err);
  }
});

export { handler };
