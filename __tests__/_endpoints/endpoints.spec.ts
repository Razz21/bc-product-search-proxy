import * as endpoints from "~/api/_endpoints";
import getProducts from "~/api/_endpoints/get-products";
import { createStatusError, getContext, getEvent, responseBody } from "../utils";

jest.mock("~/api/_endpoints/get-products", () => jest.fn());

(getProducts as jest.Mock).mockImplementation(() => responseBody);

describe("/emdpoints/index", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test("Endpoint [search] returns valid response", async () => {
    const body = { search_text: "text", page: 1, limit: 10 };
    const req = getEvent({ body: JSON.stringify(body) });
    const query = {
      "keyword:like": "text",
      page: 1,
      limit: 10,
    };
    const response = await endpoints.search(req);
    expect(getProducts).toBeCalledWith(req, query, body);
    expect(response).toEqual(responseBody);
  });

  test("Endpoint [search] throws error, if getProducts fails", async () => {
    (getProducts as jest.Mock).mockRejectedValueOnce({
      status: 500,
      message: "Network error",
    });
    const req = getEvent({
      body: JSON.stringify({ search_text: "text", page: 1, limit: 1 }),
    });
    await expect(endpoints.search(req)).rejects.toEqual({
      status: 500,
      message: "Network error",
    });
  });
  test("Endpoint [find] returns valid response", async () => {
    const req = getEvent({ queryStringParameters: { ids: "1,2" } });
    const query = {
      "id:in": "1,2",
    };
    const response = await endpoints.find(req);
    expect(getProducts).toBeCalledWith(req, query);
    expect(response).toEqual(responseBody);
  });

  test("Endpoint [find] throws error, if getProducts fails", async () => {
    (getProducts as jest.Mock).mockRejectedValueOnce({
      status: 500,
      message: "Network error",
    });
    const req = getEvent({ queryStringParameters: { ids: "1,2" } });
    await expect(endpoints.find(req)).rejects.toEqual({
      status: 500,
      message: "Network error",
    });
  });
});
