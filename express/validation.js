const joi = require('joi').extend(joi => ({
  base: joi.array(),
  coerce: (value, helpers) => ({
    value: value.split ? value.split(',') : value,
  }),
  type: 'versionArray',
}))

const headers = joi.object().keys({
  'x-auth-token': joi.string().required(),
  'store-hash': joi.string().required(),
  'api-version': joi.string().optional(),
  'content-type': joi.string().equal('application/json').optional(),
}).unknown(true);

module.exports = {
  productSearch: {
    headers,
    body: joi.object({
      search_text: joi.string().trim().required(),
      page: joi.number().integer().required(),
      limit: joi.number().integer().required(),
    }).unknown(true)
  },
  products: {
    headers,
    query: joi.object({
      ids: joi.versionArray().items(joi.string()).required(),
    }).unknown(true)
  }
}
