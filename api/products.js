const validator = require('../src/validation');
const handler = require('../src/endpoints');
const { validateHttpMethod, corsHeaders, corsMiddleware } = require('../src/helpers');

module.exports = async (req, res) => {
  try {
    validateHttpMethod(req, "GET");
    const { error } = await validator.products.validate(req)
    if (error) {
      return res.status(400).send(error.message)
    };
    const result = await handler.find(req);
    res.status(200).json(result)
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message || 'Failed fetching data' })
  }
}
