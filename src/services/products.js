// import productsRepository from '../repositories/fs/products.js';
import CONFIG from '../utils/config.js';
import productsRepository from '../repositories/mongo/products.js';

const _buildPaginationOptions = (params) => {
  if (params.limit || params.page || params.sort) {
    const limit = parseInt(params.limit) || CONFIG.DEFAULT_PAGINATION_LIMIT;
    const page = parseInt(params.page) || CONFIG.DEFAULT_PAGINATION_PAGE;
    const sort = params.sort ? { price: params.sort === 'asc' ? 1 : -1 } : {};
    return { limit, page, sort };
  }
  return {};
};

const _addNavigationLinks = (products, params) => {
  const queryParams = new URLSearchParams(params);
  queryParams.delete('page');
  const baseQuery = queryParams.toString() ? `&${queryParams}` : '';
  products.prevLink = products.hasPrevPage
    ? `${CONFIG.BASE_URL}/api/products?page=${products.prevPage}${baseQuery}`
    : null;
  products.nextLink = products.hasNextPage
    ? `${CONFIG.BASE_URL}/api/products?page=${products.nextPage}${baseQuery}`
    : null;
};

export const makePaginatedResponse = (products, success) => {
  return {
    success,
    payload: products.docs,
    total: products.totalDocs,
    totalPages: products.totalPages,
    pagingCounter: products.pagingCounter,
    page: products.page,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage,
    prevPage: products.prevPage,
    nextPage: products.nextPage,
    prevLink: products.prevLink,
    nextLink: products.nextLink,
  };
};

const productsService = {
  init: async () => {
    await productsRepository.init();
  },
  add: async (product) => {
    return await productsRepository.add(product);
  },
  get: async (id) => {
    return await productsRepository.get(id);
  },
  getAll: async (params) => {
    let products;
    if (params) {
      const { category, availabilty, ...restOfParams } = params;
      const options = _buildPaginationOptions(restOfParams);
      const queryConditions = {
        status: true,
      };
      if (category) {
        queryConditions.categories = category;
      }
      if (availabilty !== undefined) {
        queryConditions.stock =
          availabilty === 'true' ? { $gt: 0 } : { $lte: 0 };
      }
      products = await productsRepository.getAll(queryConditions, options);
      _addNavigationLinks(products, params);
    } else {
      products = await productsRepository.getAll({}, {});
    }
    return products;
  },
  update: async (id, product) => {
    return await productsRepository.update(id, product);
  },
  delete: async (id) => {
    return await productsRepository.delete(id);
  },
};

export default productsService;
