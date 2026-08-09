// ─── Mock DB-aligned data ───────────────────────────────────────────────────

export const mockUser = {
  id: 1, name: 'Arjun Sharma', email: 'arjun@email.com',
  phone: '9876543210', role: 'customer'
}

export const mockAdmin = {
  id: 2, name: 'Priya Mehta', email: 'admin@tablebook.in',
  phone: '9123456789', role: 'admin'
}

export const mockTables = [
  { id:1, table_number:'T-01', capacity:2, location:'indoor',  status:'available' },
  { id:2, table_number:'T-02', capacity:4, location:'indoor',  status:'available' },
  { id:3, table_number:'T-03', capacity:4, location:'outdoor', status:'booked'    },
  { id:4, table_number:'T-04', capacity:6, location:'indoor',  status:'available' },
  { id:5, table_number:'T-05', capacity:2, location:'outdoor', status:'available' },
  { id:6, table_number:'T-06', capacity:8, location:'indoor',  status:'maintenance'},
  { id:7, table_number:'T-07', capacity:4, location:'outdoor', status:'available' },
  { id:8, table_number:'T-08', capacity:6, location:'outdoor', status:'booked'    },
  { id:9, table_number:'T-09', capacity:2, location:'indoor',  status:'available' },
  { id:10,table_number:'T-10', capacity:4, location:'indoor',  status:'available' },
]

export const mockTimeSlots = [
  { id:1, start_time:'12:00', end_time:'13:00', label:'12:00 PM', is_available:true },
  { id:2, start_time:'13:00', end_time:'14:00', label:'1:00 PM',  is_available:true },
  { id:3, start_time:'14:00', end_time:'15:00', label:'2:00 PM',  is_available:true },
  { id:4, start_time:'19:00', end_time:'20:00', label:'7:00 PM',  is_available:true },
  { id:5, start_time:'20:00', end_time:'21:00', label:'8:00 PM',  is_available:true },
  { id:6, start_time:'21:00', end_time:'22:00', label:'9:00 PM',  is_available:false},
]

export const mockBookings = [
  {
    id:1, user_id:1, table_id:2, date:'2026-06-10', time_slot:'7:00 PM',
    guest_count:3, status:'confirmed',
    table: { table_number:'T-02', capacity:4, location:'indoor' },
    user: { name:'Arjun Sharma', email:'arjun@email.com' }
  },
  {
    id:2, user_id:1, table_id:5, date:'2026-06-15', time_slot:'1:00 PM',
    guest_count:2, status:'pending',
    table: { table_number:'T-05', capacity:2, location:'outdoor' },
    user: { name:'Arjun Sharma', email:'arjun@email.com' }
  },
  {
    id:3, user_id:3, table_id:4, date:'2026-06-08', time_slot:'8:00 PM',
    guest_count:5, status:'cancelled',
    table: { table_number:'T-04', capacity:6, location:'indoor' },
    user: { name:'Rohan Verma', email:'rohan@email.com' }
  },
  {
    id:4, user_id:4, table_id:1, date:'2026-06-08', time_slot:'12:00 PM',
    guest_count:2, status:'confirmed',
    table: { table_number:'T-01', capacity:2, location:'indoor' },
    user: { name:'Sneha Patil', email:'sneha@email.com' }
  },
  {
    id:5, user_id:5, table_id:7, date:'2026-06-09', time_slot:'7:00 PM',
    guest_count:4, status:'pending',
    table: { table_number:'T-07', capacity:4, location:'outdoor' },
    user: { name:'Amit Joshi', email:'amit@email.com' }
  },
]

export const mockRestaurants = [
  {
    id:1, name:'The Bombay Brasserie', cuisine:'North Indian · Mughlai',
    rating:4.5, reviews:2341, avgCost:'₹800 for two', discount:'25% Off',
    deliveryTime:'30-40 min', isOpen:true,
    image:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    tags:['Pure Veg','Rooftop','Fine Dining']
  },
  {
    id:2, name:'Spice Garden', cuisine:'South Indian · Kerala',
    rating:4.2, reviews:1892, avgCost:'₹400 for two', discount:'Flat ₹100 Off',
    deliveryTime:'20-30 min', isOpen:true,
    image:'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    tags:['Family Style','Thali','Authentic']
  },
  {
    id:3, name:'Café Monsoon', cuisine:'Continental · Cafe',
    rating:4.7, reviews:987, avgCost:'₹600 for two', discount:'20% Off',
    deliveryTime:'25-35 min', isOpen:true,
    image:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    tags:['Pet Friendly','Outdoor','Brunch']
  },
  {
    id:4, name:'Dragon Palace', cuisine:'Chinese · Pan-Asian',
    rating:4.0, reviews:3201, avgCost:'₹700 for two', discount:'30% Off',
    deliveryTime:'35-45 min', isOpen:false,
    image:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    tags:['Popular','Group Dining']
  },
  {
    id:5, name:'Peshwai Mahal', cuisine:'M   aharashtrian · Traditional',
    rating:4.6, reviews:1456, avgCost:'₹350 for two', discount:'15% Off',
    deliveryTime:'15-25 min', isOpen:true,
    image:'https://images.unsplash.com/photo-1567529692333-de9fd6772897?w=400&h=300&fit=crop',
    tags:['Heritage','Local Fav','Thali']
  },
  {
    id:6, name:'Terrazzo Bistro', cuisine:'Italian · Mediterranean',
    rating:4.4, reviews:788, avgCost:'₹1200 for two', discount:'Chef Special',
    deliveryTime:'40-50 min', isOpen:true,
    image:'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    tags:['Romantic','Wine Bar','Fine Dining']
  },
]

export const mockCuisines = [
  { id:1, name:'North Indian', count:342, emoji:'🍛', color:'#e23744' },
  { id:2, name:'South Indian', count:218, emoji:'🥘', color:'#ff6b35' },
  { id:3, name:'Chinese',      count:189, emoji:'🥢', color:'#c0392b' },
  { id:4, name:'Continental',  count:156, emoji:'🥗', color:'#27ae60' },
  { id:5, name:'Italian',      count:98,  emoji:'🍕', color:'#8e44ad' },
  { id:6, name:'Street Food',  count:267, emoji:'🌮', color:'#f39c12' },
  { id:7, name:'Desserts',     count:134, emoji:'🍮', color:'#e91e63' },
  { id:8, name:'Seafood',      count:87,  emoji:'🦐', color:'#00bcd4' },
]

export const mockArticles = [
  {
    id:1, title:'10 Hidden Gems in Koregaon Park You Must Try',
    author:'Riya Kapoor', readTime:'5 min read', category:'Food Guide',
    image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop'
  },
  {
    id:2, title:'The Rise of Fusion Cuisine in Pune\'s Food Scene',
    author:'Karan Mehta', readTime:'8 min read', category:'Trend',
    image:'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300&h=200&fit=crop'
  },
  {
    id:3, title:'Best Rooftop Dining Spots for Monsoon Season',
    author:'Ananya Rao', readTime:'6 min read', category:'Seasonal',
    image:'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=300&h=200&fit=crop'
  },
]

export const quickFilters = [
  { id:1, label:'Lunch',      icon:'☀️', time:'12 PM - 3 PM' },
  { id:2, label:'Dinner',     icon:'🌙', time:'7 PM - 11 PM' },
  { id:3, label:'Breakfast',  icon:'🌅', time:'8 AM - 11 AM' },
  { id:4, label:'Fast Food',  icon:'⚡', time:'All Day'       },
  { id:5, label:'Near Me',    icon:'📍', time:'< 2 km'        },
]
