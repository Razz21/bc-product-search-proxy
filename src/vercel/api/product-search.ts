import validator from "@/validation";
import * as apiHandler from "@/endpoints";
import { validateHttpMethod, handleError } from "@/helpers";
import { allowCors } from "../helpers";
import { HTTPMethods } from "@/types";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default allowCors(async (req: VercelRequest, res: VercelResponse) => {
  try {
    validateHttpMethod(req, HTTPMethods.POST);
    const { error } = await validator.productSearch.validate(req);
    if (error) {
      return res.status(400).send(error.message);
    }
    const result = await apiHandler.search(req);
    return res.status(200).json(result);
  } catch (err) {
    const { statusCode, body } = handleError(err);
    res.status(statusCode).json(JSON.parse(body));
  }
});
