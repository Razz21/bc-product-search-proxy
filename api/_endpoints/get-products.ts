import qs from 'qs';
import fetch from 'cross-fetch';
import getHeaders from './get-headers';
import type { ServerlessRequest, BigCommerceResponse } from '../_types';

async function getProducts(req: ServerlessRequest, query: Record<string,unknown>, params: Record<string, unknown> = {}) {
  try {
    const store_hash = req.headers['store-hash'];
    const api_version = req.headers['api-version'] || 'v3';
    const { page = 0 } = params;
    const apiEndpoint = `https://api.bigcommerce.com/stores/${store_hash}/${api_version}/catalog/products`;

    const queryParams = qs.stringify({
      ...query,
      include: "primary_image",
    });
    const requestParams = {
      method: "GET",
      headers: await getHeaders(req)
    }

    const response = await fetch(apiEndpoint + '?' + queryParams, requestParams);

    const { data, meta }: BigCommerceResponse = await response.json();

    const items = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.primary_image ? item.primary_image.url_standard : ''
      }
    })
    const pageSettings = {
      numPages: meta.pagination.total_pages,
      curPage: page,
      total: meta.pagination.total
    }
    return { items, page: pageSettings }

  } catch (err) {
    throw err;
  }
}

export default getProducts;
