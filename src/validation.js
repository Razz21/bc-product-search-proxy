const joi = require('joi').extend(joi => ({
  base: joi.array(),
  coerce: (value, helpers) => ({
    value: value.split ? value.split(',') : value,
  }),
  type: 'versionArray',
})).extend(joi => ({
  base: joi.object(),
  coerce: (value, helpers) => {
    try {
      if(typeof value === "object"){
        return { value }
      }
      return { value: JSON.parse(value) };
    } catch (_) {
      return
    }
  },
  type: 'json',
  messages: {
    'object.base': `"body" must be a valid JSON`
  }
}))

const headers = joi.object().keys({
  'x-auth-token': joi.string().required(),
  'store-hash': joi.string().required(),
  'api-version': joi.string().optional(),
  'content-type': joi.string().equal('application/json').required(),
}).unknown(true);

module.exports = {
  productSearch: joi.object({
    headers,
    body: joi.json({
      search_text: joi.string().trim().required(),
      page: joi.number().integer().required(),
      limit: joi.number().integer().required(),
    }).unknown(true)
  }).unknown(true),
  products: joi.object({
    headers,
    query: joi.object({
      ids: joi.versionArray().items(joi.string()).required(),
    }).unknown(true)
  }).unknown(true)
}
