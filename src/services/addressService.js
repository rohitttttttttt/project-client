import API from './api';

const addressService = {
  getMyAddress: () => API.get('/address'),
  addAddress: (payload) => API.post('/address', payload),
  updateAddress: (payload) => API.patch('/address', payload),
  deleteAddress: () => API.delete('/address'),
};

export default addressService;
