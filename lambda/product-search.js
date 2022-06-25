const validator = require('../express/validation');
const handler = require('../express/endpoints');
const { validateHttpMethod, corsHeaders } = require('../express/helpers');

exports.handler = async (event, context) => {
  if(event.httpMethod === "OPTIONS"){
    return {
      statusCode: 200,
      body: "Hello, world!",
      headers: {
        "access-control-allow-origin": "*",
        'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Access-Control-Allow-Origin",
        'Access-Control-Allow-Methods': '*',
      },
    }
  }
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
}
