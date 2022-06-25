# Bigcommerce Product Search Proxy Server

[![Netlify
Status](https://api.netlify.com/api/v1/badges/9aaef7de-1e5d-4fda-bc39-faa10a68b35b/deploy-status)](https://app.netlify.com/sites/bc-product-search-proxy/deploys)

[![Deploy to
Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Razz21/bc-product-search-proxy)

## Building

Run locally in developer mode, app automatically rebuilds the app when changes are made.
```
$ npm install -g netlify-cli
$ netlify dev
```

### Request Parameters

#### Product Search

| Parameter   | Type   |          | Description |
| ----------- |:------:| --------:|------------:|
| search_text | String | Required | text based search parameter |
| limit       | Int    | Required | Page limt per page |
| page        | Int    | Required | Item return page |

request example;

```
type; POST
endpoint; /product-search
headers;
    Content-Type; application/json
    X-Auth-Token; {AUTH-TOKEN}
    store-hash; {STORE-ID}
    api-version; {API-VER}
body;
    {
      "search_text": "shoe",
      "limit": 20,
      "page": 0
    }
```

#### Get Products by Ids

| Parameter | Type    |          | Description |
| --------- |:-------:| --------:| -----------:|
| ids       | String  | Required | Ids separated by comma (,) |

request example;

```
type; GET
endpoint; /products
params;
    ids=120,121
headers;
    Content-Type; application/json
    X-Auth-Token; {AUTH-TOKEN}
    store-hash; {STORE-ID}
    api-version; {API-VER}

http://localhost:3000/products?ids=120,121
```

#### Extension Example

```
"ui:extension": {
    "url": "http://localhost:3000/",
    "params": {
        "proxyUrl": {The URL of the proxy service},
        "storeHash": {STORE-ID},
        "accessToken": {AUTH-TOKEN},
        "apiVersion": 'v3'
    }
}
```
