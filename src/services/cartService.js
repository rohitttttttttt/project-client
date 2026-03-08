import API from './api';

const cartService = {
  /**
   * Get user's cart
   */
  getCart: () => API.get('/cart'),

  /**
   * Add item to cart
   * @param {{ productId: string, quantity?: number }} payload
   */
  addToCart: (payload) => API.post('/cart', payload),

  /**
   * Update item quantity in cart
   */
  updateItem: (productId, quantity) =>
    API.patch(`/cart/${productId}`, { quantity }),

  /**
   * Remove specific item from cart
   */
  removeItem: (productId) => API.delete(`/cart/${productId}`),

  /**
   * Clear entire cart
   */
  clearCart: () => API.delete('/cart/clear'),
};

export default cartService;
