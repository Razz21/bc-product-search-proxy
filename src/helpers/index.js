exports.validateHttpMethod = (req, validMethod = "GET") => {
  if (req.method !== validMethod) {
    const error = new Error(`${req.method} is not allowed!`)
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

exports.transformAwsEventToRequest = (event) =>{
  return {
    ...event,
    query: event.queryStringParameters,
    method: event.httpMethod
  }
}

exports.allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', corsHeaders["access-control-allow-origin"])
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', corsHeaders["Access-Control-Allow-Methods"])
  res.setHeader(
    'Access-Control-Allow-Headers',
    corsHeaders["Access-Control-Allow-Headers"]
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}
