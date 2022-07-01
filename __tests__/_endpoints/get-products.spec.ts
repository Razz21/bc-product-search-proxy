import getProducts from "~/src/_endpoints/get-products";
import { getEvent, responseBody, fetchResponse } from "../utils";
import crossFetch from "cross-fetch";

jest.mock("cross-fetch", () => {
  //Mock the default export
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
(crossFetch as jest.Mock).mockImplementation(() => ({
  json: async () => fetchResponse,
}));

describe("/endpoints/getProduct", () => {
  beforeEach(()=>{
    jest.restoreAllMocks();
  })
  test("Returns valid response", async () => {

    const event = getEvent({
      headers: {
        "store-hash": "hash",
        "api-version": "v3",
        "x-auth-token": "valid-token",
      },
    });
    const response = await getProducts(event, {});
    expect(response).toEqual(responseBody);
  });

  test("Fetch sends requests with valid arguments", async () => {

    const event = getEvent({
      headers: {
        "store-hash": "hash",
        "api-version": "v3",
        "x-auth-token": "valid-token",
      },
    });
    const query = {
      'id:in': "1,2,3"
    }
    const expectedApiUrl = `https://api.bigcommerce.com/stores/hash/v3/catalog/products?id%3Ain=1%2C2%2C3&include=primary_image`
    const expectedParams = {
      method: "GET",
      headers: {
        "X-Auth-Token": "valid-token",
        "Content-Type": "application/json",
      }
    }
    await getProducts(event, query);
    expect(crossFetch).toBeCalledWith(expectedApiUrl, expectedParams);
  });

  test("Throw error, if x-auth-token header is not available", async () => {

    const event = getEvent({
      headers: {
        "store-hash": "hash",
        "api-version": "v3",
      },
    });
    await expect(getProducts(event, {})).rejects.toEqual({
      code: "TOKEN_ERROR",
      message: "Error getting token",
    });
  });

  test("Throw error, if fetch fails", async () => {
    (crossFetch as jest.Mock).mockRejectedValue({
      status: 500,
      message: "Network error",
    });
    const event = getEvent({
      headers: {
        "store-hash": "hash",
        "api-version": "v3",
        "x-auth-token": "valid-token",
      },
    });

    await expect(getProducts(event, {})).rejects.toEqual({
      status: 500,
      message: "Network error",
    });
  });
});
