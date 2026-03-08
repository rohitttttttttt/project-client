import API from './api';

const orderService = {
  /**
   * Place order from cart
   */
  placeOrder: (addressId) => API.post('/order/placeOrder', { addressId }),

  /**
   * Get buyer's orders
   */
  getMyOrders: () => API.get('/order'),

  /**
   * Get seller's orders (optional status filter)
   * @param {string} [status] — e.g. 'pending', 'confirmed', 'shipped'
   */
  getSellerOrders: (status) =>
    API.get('/order/seller', { params: status ? { status } : {} }),

  /**
   * Get a single order by ID
   */
  getById: (orderId) => API.get(`/order/${orderId}`),

  /**
   * Seller updates order status
   */
  updateStatus: (orderId, status) =>
    API.patch(`/order/${orderId}/status`, { status }),

  /**
   * Cancel an order (buyer or seller)
   */
  cancelOrder: (orderId) => API.patch(`/order/${orderId}/cancel`),
};

export default orderService;
