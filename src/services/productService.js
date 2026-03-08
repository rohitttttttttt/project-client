import API from './api';

const productService = {
  /**
   * Home page curated feed
   */
  getHomeFeed: (coords) => API.get('/product/feed', { params: coords }),

  /**
   * Top-rated products
   */
  getTopRated: () => API.get('/product/top-rated'),

  /**
   * Best-selling products
   */
  getBestSellers: () => API.get('/product/best-sellers'),

  /**
   * Recently added products
   */
  getLatest: () => API.get('/product/latest'),

  /**
   * Organic products
   */
  getOrganic: () => API.get('/product/organic'),

  /**
   * Products near user's coordinates
   * @param {{ latitude: number, longitude: number }} coords
   */
  getNearMe: (coords) => API.post('/product/near-me', coords),

  /**
   * Full-text search with optional filters
   * @param {{ title?: string, category?: string, minPrice?: number, maxPrice?: number }} filters
   */
  search: (filters) => API.post('/product/search', filters),

  /**
   * Get single product by ID
   */
  getById: (id) => API.get(`/product/${id}`),

  /**
   * Get products by category
   */
  getByCategory: (categoryId) => API.get(`/product/category/${categoryId}`),

  /**
   * Get products by subcategory
   */
  getBySubCategory: (categoryId, subCategory) =>
    API.get(`/product/category/${categoryId}/${subCategory}`),

  /**
   * Get a seller's public products
   */
  getSellerProducts: (sellerId) => API.get(`/product/seller/${sellerId}`),

  /**
   * Get logged-in farmer's own products (protected)
   */
  getMyProducts: () => API.get('/product/my/products'),
};

export default productService;
