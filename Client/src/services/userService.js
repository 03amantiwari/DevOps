// API calls for customer, owner, and admin user data
import api from './api'

export const userService = {
  // Customer profile — GET /api/v1/customer/{id}
  getCustomer:    (id)       => api.get(`/customer/${id}`),
  updateCustomer: (id, data) => api.put(`/customer/${id}`, data),

  // Owner profile — GET /api/v1/owner/{id}
  getOwner:       (id)       => api.get(`/owner/${id}`),
  updateOwner:    (id, data) => api.put(`/owner/${id}`, data),

  // Admin — list all owners / customers
  getAllOwners:    ()         => api.get('/admin/owner'),
  getAllCustomers: ()         => api.get('/admin/customer'),
}
