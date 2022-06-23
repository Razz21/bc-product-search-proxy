const serverless = require('serverless-http');
const app = require('../express/server');

module.exports.handler = serverless(app);
