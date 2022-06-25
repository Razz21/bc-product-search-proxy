// const serverless = require('serverless-http');
// const app = require('../express/server');

// module.exports.handler = serverless(app);
module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  }
};
