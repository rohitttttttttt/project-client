import API from './api';

const authService = {
  /**
   * Register a new user
   * @param {{ fullName: string, email?: string, phone?: string, password: string, role?: 'user'|'farmer' }} payload
   */
  signup: (payload) => API.post('/user/register', payload),

  /**
   * Login with email/phone + password
   * @param {{ email?: string, phone?: string, password: string }} payload
   */
  login: (payload) => API.post('/user/login', payload),

  /**
   * Logout the current user
   */
  logout: () => API.post('/user/logout'),

  /**
   * Get current authenticated user
   */
  getMe: () => API.get('/user/me'),

  /**
   * Refresh the access token using the HTTP-only refresh cookie
   */
  refreshToken: () => API.post('/user/refresh-token'),

  /**
   * Get a user by ID (protected)
   */
  getUser: (id) => API.get(`/user/${id}`),
};

export default authService;
