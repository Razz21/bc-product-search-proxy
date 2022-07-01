import joiRoot from "joi";
import type { Root, ArraySchema, ObjectSchema, CustomHelpers, Extension } from "joi";

interface ExtendedJoi extends Root {
  versionArray(): ArraySchema;
  json(): ObjectSchema;
}

const arrayExtension: Extension = {
  base: joiRoot.array(),
  type: "versionArray",
  coerce: (value, helpers: CustomHelpers) => ({
    value: value.split ? value.split(",") : value,
  }),
};
const jsonExtension: Extension = {
  base: joiRoot.object(),
  coerce: {
    from: "string",
    method: (value: string, helpers: CustomHelpers) => {
      try {
        return { value: JSON.parse(value) };
      } catch (_) {
        return helpers.error("objectId.invalid");
      }
    },
  },
  type: "json",
  messages: {
    "object.invalid": `"{{#label}}" must be a valid JSON`,
  },
};

const joi: ExtendedJoi = joiRoot.extend(jsonExtension, arrayExtension);

const headers = joi
  .object()
  .keys({
    "x-auth-token": joi.string().required(),
    "store-hash": joi.string().required(),
    "api-version": joi.string().optional(),
    "content-type": joi.string().equal("application/json").required(),
  })
  .unknown(true);

export default {
  productSearch: joi
    .object({
      headers,
      body: joi
        .json()
        .keys({
          search_text: joi.string().trim().required(),
          page: joi.number().integer().min(0).required(),
          limit: joi.number().integer().positive().required(),
        })
        .unknown(true),
    })
    .unknown(true),
  products: joi
    .object({
      headers,
      queryStringParameters: joi
        .object({
          ids: joi.versionArray().items(joi.string()).required(),
        })
        .unknown(true),
    })
    .unknown(true),
};
