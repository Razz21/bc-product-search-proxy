const getToken = require('./get-token')

async function getHeaders(req) {
  return {
    'X-Auth-Token': await getToken(req),
    "Content-Type": "application/json"
  };
}

module.exports = getHeaders
