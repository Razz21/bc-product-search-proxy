import getProducts from './get-products';
import type { ServerlessRequest } from '~/types';


async function search(req: ServerlessRequest) {
  const body = JSON.parse(req.body)
  const { search_text, page, limit } = body
  const query = {
    'keyword:like': search_text,
    page,
    limit
  }
  return getProducts(req, query, body);
}

async function find(req: ServerlessRequest) {
  const { ids } = req.queryStringParameters
  const query = {
    'id:in': ids
  }
  return getProducts(req, query);
}

export {
  search,
  find
}
