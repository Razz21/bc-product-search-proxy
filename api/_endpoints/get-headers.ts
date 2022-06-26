import getToken from './get-token';
import type { ServerlessRequest } from '../_types';

async function getHeaders(req: ServerlessRequest) {
  return {
    'X-Auth-Token': await getToken(req),
    "Content-Type": "application/json"
  };
}

export default getHeaders
