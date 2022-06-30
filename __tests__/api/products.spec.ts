import { HandlerContext, HandlerEvent } from "@netlify/functions";
import { handler } from "~/api/products";
import { HTTPMethods } from "~/api/_types";
import * as helpers from "~/api/_helpers";
import validator from "~/api/_validation";
import getProducts from "~/api/_endpoints/get-products";
import { createStatusError, getContext, getEvent, responseBody } from "../utils";

jest.mock("~/api/_endpoints/get-products", () => jest.fn());

(getProducts as jest.Mock).mockImplementation(() => responseBody);

describe("endpoint /api/products", function () {
  let getRequest: (
    e?: Partial<HandlerEvent>,
    c?: Partial<HandlerContext>
  ) => [HandlerEvent, HandlerContext];
  beforeEach(() => {
    jest.restoreAllMocks();
    getRequest = (eventOpts = {}, contextOpts = {}) => {
      const event = getEvent({
        queryStringParameters: { ids: "1" },
        httpMethod: HTTPMethods.GET,
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
    const [event, context] = getRequest({ httpMethod: HTTPMethods.POST });

    const result = await handler(event, context);
    expect(result.statusCode).toEqual(405);
    expect(result.body).toEqual(
      JSON.stringify({ message: `POST is not allowed!` })
    );
  });
  test("Should throw 400 on validation param fail", async () => {
    const error = createStatusError("x-auth-token is required");
    const [event, context] = getRequest();

    const validateSpy = jest
      .spyOn(helpers, "validateRequest")
      .mockRejectedValueOnce(error);
    const result = await handler(event, context);
    expect(validateSpy).toBeCalledWith(event, validator.products);
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
