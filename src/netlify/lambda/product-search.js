const validator = require('../../validation');
const handler = require('../../endpoints');
const { validateHttpMethod, corsHeaders, corsMiddleware } = require('../../helpers');

exports.handler = corsMiddleware(async (event, context) => {
  try {
    validateHttpMethod(event, "POST");
    const { error } = await validator.productSearch.validate(event)
    if (error) {
      error.statusCode = 400;
      throw error;
    };
    const result = await handler.search(event, context);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: corsHeaders
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ message: err.message || 'Failed fetching data' }),
      headers: corsHeaders
    }
  }
})
