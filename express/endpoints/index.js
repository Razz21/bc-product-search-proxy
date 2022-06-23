const getProducts = require('./get-products');

async function search(req, res) {
  const { search_text, page, limit } = req.body
  const query = {
    'keyword:like': search_text,
    page,
    limit
  }
  return getProducts(req, res, query, req.body);
}

async function find(req, res) {
  const { ids } = req.query
  const query = {
    'id:in': ids
  }
  return getProducts(req, res, query, req.query);
}

module.exports = {
  search,
  find
}
