import type { ServerlessRequest } from '@/types';

async function getToken(req: ServerlessRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    const authToken = req.headers['x-auth-token'] as string|undefined
    if (authToken) {
      return resolve(authToken)
    } else {
      return reject({ code: 'TOKEN_ERROR', message: 'Error getting token' });
    }
  })
}

export default getToken
