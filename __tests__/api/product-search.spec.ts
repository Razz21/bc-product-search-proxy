import { HandlerContext, HandlerEvent } from "@netlify/functions";
import { handler } from "~/api/product-search";
import { HTTPMethods } from "~/types";
import * as helpers from "~/src/_helpers";
import validator from "~/src/_validation";
import getProducts from "~/src/_endpoints/get-products";
import { createStatusError, getContext, getEvent, responseBody } from "../utils";

jest.mock("~/src/_endpoints/get-products", () => jest.fn());

(getProducts as jest.Mock).mockImplementation(() => responseBody);

describe("endpoint /api/product-search", function () {
  let getRequest: (
    e?: Partial<HandlerEvent>,
    c?: Partial<HandlerContext>
  ) => [HandlerEvent, HandlerContext];
  beforeEach(() => {
    jest.restoreAllMocks();
    getRequest = (eventOpts = {}, contextOpts = {}) => {
      const event = getEvent({
        body: JSON.stringify({ search_text: "product", page: 1, limit: 5 }),
        httpMethod: HTTPMethods.POST,
        ...eventOpts,
      });
      const context = getContext(contextOpts);
      return [event, context];
    };
  });
  test("Successful response", async () => {
    const [event, context] = getRequest();

    const result = await handler(event, context);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify(responseBody));
  });
  test("Should validate httpMethod", async () => {
    const [event, context] = getRequest({ httpMethod: HTTPMethods.GET });

    const result = await handler(event, context);
    expect(result.statusCode).toEqual(405);
    expect(result.body).toEqual(
      JSON.stringify({ message: `GET is not allowed!` })
    );
  });
  test("Should throw 400 on validation param fail", async () => {
    const error = createStatusError("x-auth-token is required");
    const [event, context] = getRequest();

    const validateSpy = jest
      .spyOn(helpers, "validateRequest")
      .mockRejectedValueOnce(error);
    const result = await handler(event, context);
    expect(validateSpy).toBeCalledWith(event, validator.productSearch);
    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({ message: "x-auth-token is required" })
    );
  });
  test("Should throw 500 on fetch fail", async () => {
    (getProducts as jest.Mock).mockRejectedValueOnce({
      status: 500,
      json: () => ({
        error: {
          message: "Network error",
        },
      }),
    });
    const [event, context] = getRequest();
    const result = await handler(event, context);
    expect(result.statusCode).toEqual(500);
    expect(result.body).toEqual(
      JSON.stringify({ message: "Failed fetching data" })
    );
  });
});
