import getHeaders from "~/api/_endpoints/get-headers";
import { getEvent } from "../utils";

describe("endpoints/getHeaders", () => {
  test("Returns headers, if X-Auth-Token headers is available", async () => {
    const event = getEvent({ headers: { "x-auth-token": "valid-token" } });
    const headers = await getHeaders(event);

    expect(headers).toEqual({
      "X-Auth-Token": "valid-token",
      "Content-Type": "application/json",
    });
  });
  test("Throws error, if X-Auth-Token header is not available", async () => {
    const event = getEvent({ headers: { "some-header": "some-value" } });

    await expect(getHeaders(event)).rejects.toEqual({
      code: "TOKEN_ERROR",
      message: "Error getting token",
    });
  });
});
