const getProducts = require('./get-products');

async function search(req) {
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body
  const { search_text, page, limit } = body
  const query = {
    'keyword:like': search_text,
    page,
    limit
  }
  return getProducts(req, query, body);
}

async function find(req) {
  const { ids } = req.query
  const query = {
    'id:in': ids
  }
  return getProducts(req, query, req.query);
}

module.exports = {
  search,
  find
}
