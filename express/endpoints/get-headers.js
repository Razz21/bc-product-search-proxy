const getToken = require('./get-token')

async function getHeaders(req, res) {
  return {
    'X-Auth-Token': await getToken(req, res),
    "Content-Type": "application/json"
  };
}

module.exports = getHeaders
