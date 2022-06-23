const qs = require('qs');
const fetch = require('cross-fetch');
const getHeaders = require('./get-headers')

async function getProducts(req, res, query, params) {
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
      headers: {
        ...await getHeaders(req, res)
      }
    }

    const response = await fetch(apiEndpoint + '?' + queryParams, requestParams);

    const { data, meta = {} } = await response.json();

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
    res.status(200).json({ items, page: pageSettings });

  } catch (err) {
    console.error(err)
    res.status(500).json({ code: 'UNKNOWN', message: 'An unknown error occured' });
  }
}

module.exports = getProducts;
