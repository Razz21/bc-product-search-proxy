export interface Request {
  headers: {
    'x-auth-token': string,
    'store-hash': string,
    'api-version'?: string,
    'content-type': string
  },
  body?: Body,
  query?: Query
}

interface Query {
  ids: string[]
}

interface Body {
  search_text: string,
  limit: string
  page: string
}
