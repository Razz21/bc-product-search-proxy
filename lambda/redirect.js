exports.handler = async (event, context) => {
  if (event.httpMethod==="OPTIONS") {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST',
    };
    return {
      statusCode: 200,
      headers,
      body: 'success',
    }
  }
  return {
    statusCode: 307,
    headers: {
      location: '/.netlify/functions' + event.path + '?' + event.rawQuery
    }
  }
}
