const getProducts = require('./get-products');

async function search(event, context) {
  const { search_text, page, limit } = JSON.parse(event.body)
  const query = {
    'keyword:like': search_text,
    page,
    limit
  }
  return getProducts(event, query, event.body);
}

async function find(event, context) {
  const { ids } = event.queryStringParameters
  const query = {
    'id:in': ids
  }
  return getProducts(event, query, event.queryStringParameters);
}

module.exports = {
  search,
  find
}
