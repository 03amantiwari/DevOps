// Restaurant, Table, and TimeSlot API calls
import api from './api'

export const restaurantService = {
  // Home page listing
  getAll:       ()              => api.get('/restaurants'),
  getById:      (id)            => api.get(`/restaurants/${id}`),

  // Booking page — fetch tables and slots for a specific restaurant
  getTables:    (restaurantId)  => api.get(`/restaurants/${restaurantId}/tables`),
  getTimeSlots: (restaurantId)  => api.get(`/restaurants/${restaurantId}/timeslots`),

  /**
   * Single-call cascading restaurant creation.
   * Sends ONE POST with restaurant + tables[] + timeSlots[] nested in the payload.
   * Backend @Transactional saves all three in one DB transaction.
   * Endpoint: POST /api/v1/restaurants (requires ROLE_OWNER JWT)
   */
  createRestaurant: (payload) => api.post('/restaurants', payload),

  /**
   * Toggle open/closed status — no request body needed.
   * Backend flips active: true→false or false→true.
   * Returns updated RestaurantResponseDto with new active value.
   * Endpoint: PATCH /api/v1/restaurants/{id}/toggle-status (requires ROLE_OWNER JWT)
   */
  toggleStatus: (id) => api.patch(`/restaurants/${id}/toggle-status`),

  /**
   * Soft-delete — hides restaurant from customers (active=false).
   * Restaurant is NOT deleted from DB. Owner can restore it.
   * Endpoint: PATCH /api/v1/restaurants/{id}/soft-delete
   */
  softDelete: (id) => api.patch(`/restaurants/${id}/soft-delete`),

  /**
   * Restore — brings restaurant back to public listing (active=true).
   * Endpoint: PATCH /api/v1/restaurants/{id}/restore
   */
  restore: (id) => api.patch(`/restaurants/${id}/restore`),
}
