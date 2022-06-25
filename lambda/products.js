const validator = require('../express/validation');
const handler = require('../express/endpoints');
const { validateHttpMethod, corsHeaders, corsMiddleware } = require('../express/helpers');

exports.handler = corsMiddleware(async (event, context) => {
  try {
    validateHttpMethod(event, "GET");
    const { error } = await validator.products.validate(event)
    if (error) {
      error.statusCode = 400;
      throw error;
    };
    const result = await handler.find(event, context);

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
