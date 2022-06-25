exports.validateHttpMethod = (event, validMethod="GET") => {
  if (event.httpMethod !== validMethod) {
    const error = new Error(`${event.httpMethod} is not allowed!`)
    error.statusCode = 405
    throw error
  }
}

exports.corsHeaders = {
  "Access-Control-Allow-Origin": "null"
}
