import type { AsyncHandler } from '../types';

const handler: AsyncHandler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };
