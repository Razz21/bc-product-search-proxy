exports.handler = async (event, context) => {
  return {
    statusCode: 307,
    headers: {
      location: '/.netlify/functions' + event.path + '?' + event.rawQuery
    }
  }
}
