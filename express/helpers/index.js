exports.validateHttpMethod = (event, validMethod = "GET") => {
  if (event.httpMethod !== validMethod) {
    const error = new Error(`${event.httpMethod} is not allowed!`)
    error.statusCode = 405
    throw error
  }
}

const corsHeaders = {
  "access-control-allow-origin": "*",
  'Access-Control-Allow-Headers': "store-hash, api-version, Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Access-Control-Allow-Origin",
  'Access-Control-Allow-Methods': 'GET, POST',
}
exports.corsHeaders = corsHeaders

exports.corsMiddleware = (fn) => async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      body: "Hello, world!",
      headers: corsHeaders,
    }
  }
  return fn.call(null, event, context)
}
