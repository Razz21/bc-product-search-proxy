const validator = require('../src/validation');
const handler = require('../src/endpoints');
const { validateHttpMethod, corsHeaders } = require('../src/helpers');

module.exports = async (req, res) => {
  try {
    validateHttpMethod(req, "POST");
    const { error } = await validator.productSearch.validate(req)
    if (error) {
      return res.status(400).send(error.message)
    };
    const result = await handler.search(req);
    return res.status(200).json(result)
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message || 'Failed fetching data' })
  }
}
