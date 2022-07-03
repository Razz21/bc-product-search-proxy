type BigCommerceItem = {
  id: number,
  name: string,
  primary_image?: {
    url_standard: string,
    [key: string]: unknown
  }
  [key: string]: unknown
}

type BigCommerceMeta = {
  pagination: {
    count: number;
    current_page: number
    links: {
      current: string
      next: string
    }
    per_page: number
    too_many: boolean
    total: number
    total_pages: number
  }
}

export type BigCommerceResponse = {
  data: BigCommerceItem[],
  meta: BigCommerceMeta
}

export type ResponseBody = {
  items: {
      id: number;
      name: string;
      image: string;
  }[];
  page: {
      numPages: number;
      curPage: unknown;
      total: number;
  };
}
