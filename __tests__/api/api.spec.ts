import { HandlerContext, HandlerEvent } from "@netlify/functions";
import { handler } from "../../api/api";

describe("endpoint /api/api", function () {
  test("successful response", async () => {
    const event = {} as HandlerEvent;
    const context = {}  as HandlerContext;
    const result = await handler(event, context);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify({ message: "Hello World" }));
  });
});
