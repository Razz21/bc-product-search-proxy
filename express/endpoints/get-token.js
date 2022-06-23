async function getToken(req, res) {
  return new Promise((resolve, reject) => {
    const authToken = req.headers['x-auth-token']
    if (authToken) {
      return resolve(authToken)
    } else {
      return reject({ code: 'TOKEN_ERROR', message: 'Error getting token' });
    }
  })
}

module.exports = getToken
