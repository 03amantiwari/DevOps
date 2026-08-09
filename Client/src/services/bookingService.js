import api from './api'

/**
 * Booking API calls.
 *
 * Backend base path (context-path = /api/v1):
 *   POST   /api/v1/api/bookings                        → create booking
 *   GET    /api/v1/api/bookings/my?userId=X            → my bookings
 *   PUT    /api/v1/api/bookings/{id}/cancel?userId=X   → cancel
 *   PUT    /api/v1/api/bookings/{id}/status            → update status (admin/owner)
 *
 * NOTE: The BookingController uses @RequestMapping("/api"), so the full path
 * under the context becomes /api/v1/api/bookings — this looks redundant but
 * it's intentional in the current backend design.
 */
export const bookingService = {
  createBooking:      (data)          => api.post('/api/bookings', data),
  getMyBookings:      (userId)        => api.get('/api/bookings/my', { params: { userId } }),
  cancelBooking:      (id, userId)    => api.put(`/api/bookings/${id}/cancel`, null, { params: { userId } }),

  /**
   * Owner updates a booking status (CONFIRMED, COMPLETED, CANCELLED, etc.)
   * Endpoint: PUT /api/v1/api/bookings/{id}/status
   * Body: { status: "CONFIRMED" }  — matches BookingStatusUpdateDto
   * Backend also resets table to AVAILABLE on terminal statuses.
   */
  updateStatusByOwner: (id, status)  => api.put(`/api/bookings/${id}/status`, { status }),

  getBookingById:     (id)            => api.get(`/api/bookings/${id}`),
  // Owner dashboard — bookings for one restaurant
  getRestaurantBookings: (restaurantId) => api.get(`/api/restaurants/${restaurantId}/bookings`),
}
