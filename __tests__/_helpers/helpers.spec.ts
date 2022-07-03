import * as helpers from "~/src/_helpers";
import { HTTPMethod } from "~/types";
import { getContext, getEvent } from "../utils";
import joi from "joi";

describe("helpers", () => {
  afterEach(jest.clearAllMocks);
  test("[validateHttpMethod] throws 405 error, if invalid method passed", async () => {
    const event = getEvent({ httpMethod: "POST" });
    expect(() => helpers.validateHttpMethod(event, "GET")).toThrow(
      expect.objectContaining({ message: "POST is not allowed!", statusCode: 405 })
    );
  });
  test("[validateHttpMethod] doesn't throw error, if valid method match", async () => {
    const event = getEvent({ httpMethod: "POST" });
    expect(() => helpers.validateHttpMethod(event, "POST")).not.toThrowError();
  });
  test("[validateHttpMethod] doesn't throw error, if case insensitive valid method match", async () => {
    const event = getEvent({ httpMethod: "POST" });
    expect(() => helpers.validateHttpMethod(event, "pOsT" as HTTPMethod)).not.toThrowError();
  });

  test("[validateRequest] doesn't throw error, if validation pass", async () => {
    const validatorMock = {
      validateAsync: jest.fn().mockImplementation(() => Promise.resolve({})),
    } as unknown as joi.Schema;
    const event = getEvent();

    await expect(() => helpers.validateRequest(event, validatorMock)).not.toThrowError();
  });
  test("[validateRequest] pass valid params to validator", async () => {
    const validatorMock = {
      validateAsync: jest.fn().mockImplementation(() => Promise.resolve({})),
    } as unknown as joi.Schema;

    const event = getEvent();
    await helpers.validateRequest(event, validatorMock);
    expect(validatorMock.validateAsync).toBeCalledWith(event);
  });
  test("[validateRequest] throws 400 error, if validation fails", async () => {
    const validatorMock = {
      validateAsync: jest.fn().mockImplementation(() => Promise.reject({ error: {} })),
    } as unknown as joi.Schema;
    const event = getEvent();
    let err;
    try {
      await helpers.validateRequest(event, validatorMock);
    } catch (e) {
      err = e;
    }
    expect(err).toEqual(expect.objectContaining({ statusCode: 400 }));
  });

  test("[handleError] returns valid error response for Error with statusCode", async () => {
    const error = new helpers.StatusError("Error Message");
    error.statusCode = 400;
    const response = helpers.handleError(error);
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({ message: "Error Message" }),
      headers: helpers.corsHeaders
    });
  });
  test("[handleError] returns valid error response for Error", async () => {
    const error = new Error("Error Message");
    const response = helpers.handleError(error);
    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "Error Message" }),
      headers: helpers.corsHeaders
    });
  });
  test("[handleError] returns generic error if invalid Error provided", async () => {
    const error = {};
    const response = helpers.handleError(error);
    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "Failed fetching data" }),
      headers: helpers.corsHeaders
    });
  });

  test("[handleResponse] returns valid response", async () => {
    const body = { prop: 1, prop2: 2 };
    const response = helpers.handleResponse(body);
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify(body),
      headers: helpers.corsHeaders
    });
  });

  test("[corsMiddleware] returns cors response for pre-flight request before fire handler", async () => {
    const event = getEvent({
      httpMethod: "OPTIONS",
    });
    const context = getContext();
    const mockHandler = jest.fn().mockResolvedValue({});
    const response = await helpers.corsMiddleware(mockHandler)(event, context);
    expect(response).toEqual({
      statusCode: 200,
      headers: helpers.corsHeaders,
    });
    expect(mockHandler).not.toHaveBeenCalled();
  });

  test("[corsMiddleware] fire AWS handler for regular requests", async () => {
    const event = getEvent({
      httpMethod: "GET",
    });
    const context = getContext();
    const mockHandler = jest.fn().mockResolvedValue({});
    const response = await helpers.corsMiddleware(mockHandler)(event, context);
    expect(response).not.toEqual({
      statusCode: 200,
      headers: helpers.corsHeaders,
    });
    expect(mockHandler).toHaveBeenCalledWith(event, context);
  });
});
