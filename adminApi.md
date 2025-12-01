# Admin Panel API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication APIs

### Admin Login
- **POST** `/admin/login`
- **Description**: Authenticate admin user
- **Body**:
```json
{
  "email": "admin@admin.com",
  "password": "admin123"
}
```
- **Response**:
```json
{
  "token": "jwt_token_here",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin",
    "email": "admin@admin.com",
    "role": "admin"
  }
}
```

### Create Admin
- **POST** `/admin/register`
- **POST** `/admin/create-default`
- **Description**: Create new admin user
- **Body**:
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "password123"
}
```

### Test Route
- **GET** `/admin/test`
- **Description**: Test backend connection and create default admin if none exists

---

## 📊 Dashboard APIs

### Dashboard Statistics
- **GET** `/admin/dashboard/stats` 🔒
- **Description**: Get dashboard statistics
- **Response**:
```json
{
  "totalUsers": 0,
  "activeUsers": 0,
  "inactiveUsers": 0,
  "totalAdmins": 1
}
```

### Recent Activities
- **GET** `/admin/recent-activities` 🔒
- **Description**: Get recent user activities
- **Response**:
```json
[
  {
    "user": "John Doe",
    "action": "was added to the system",
    "time": "12/25/2024, 10:30:00 AM"
  }
]
```

### Chart Data
- **GET** `/admin/chart-data` 🔒
- **Description**: Get data for dashboard charts
- **Response**:
```json
[
  {
    "label": "Total Users",
    "value": 10,
    "percentage": 100
  }
]
```

---

## 👥 User Management APIs

### Get All Users
- **GET** `/admin/users` 🔒
- **Description**: Retrieve all users (excluding passwords)

### Create User
- **POST** `/admin/users` 🔒
- **Description**: Create new user
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "status": "active"
}
```

### Update User
- **PUT** `/admin/users/:id` 🔒
- **Description**: Update user by ID
- **Body**:
```json
{
  "name": "Updated Name",
  "status": "inactive"
}
```

### Delete User
- **DELETE** `/admin/users/:id` 🔒
- **Description**: Delete user by ID

---

## 🔑 Admin Profile APIs

### Change Password
- **PUT** `/admin/change-password` 🔒
- **Description**: Change admin password
- **Body**:
```json
{
  "currentPassword": "current_password",
  "newPassword": "new_password"
}
```

### Global Search
- **GET** `/admin/search?q=search_term` 🔒
- **Description**: Search across users
- **Query Parameters**:
  - `q`: Search term (minimum 2 characters)
- **Response**:
```json
[
  {
    "type": "user",
    "name": "John Doe",
    "details": "john@example.com",
    "id": "user_id"
  }
]
```

---

## 📦 Product Management APIs

### Get All Products
- **GET** `/products` 🔒
- **Description**: Retrieve all products (sorted by creation date)

### Create Product
- **POST** `/products` 🔒
- **Description**: Create new product
- **Body**:
```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category": "Category Name",
  "stock": 100
}
```

### Update Product
- **PUT** `/products/:id` 🔒
- **Description**: Update product by ID

### Delete Product
- **DELETE** `/products/:id` 🔒
- **Description**: Delete product by ID

---

## 📋 Order Management APIs

### Get All Orders
- **GET** `/orders` 🔒
- **Description**: Retrieve all orders (sorted by creation date)

### Create Order
- **POST** `/orders` 🔒
- **Description**: Create new order

### Update Order
- **PUT** `/orders/:id` 🔒
- **Description**: Update order by ID

### Delete Order
- **DELETE** `/orders/:id` 🔒
- **Description**: Delete order by ID

---

## 💳 Payment Management APIs

### Get All Payments
- **GET** `/payments` 🔒
- **Description**: Retrieve all payments (sorted by creation date)

### Create Payment
- **POST** `/payments` 🔒
- **Description**: Create new payment record

### Delete Payment
- **DELETE** `/payments/:id` 🔒
- **Description**: Delete payment by ID

### Payment Statistics
- **GET** `/payments/stats` 🔒
- **Description**: Get payment statistics
- **Response**:
```json
{
  "totalPayments": 5000.00
}
```

---

## 🏪 Store Management APIs

### Store Operations

#### Get All Stores
- **GET** `/store/stores` 🔒
- **Description**: Retrieve all stores

#### Create Store
- **POST** `/store/stores` 🔒
- **Description**: Create new store

#### Update Store
- **PUT** `/store/stores/:id` 🔒
- **Description**: Update store by ID

#### Delete Store
- **DELETE** `/store/stores/:id` 🔒
- **Description**: Delete store by ID

### Coupon Operations

#### Get All Coupons
- **GET** `/store/coupons` 🔒
- **Description**: Retrieve all coupons (with store details)

#### Create Coupon
- **POST** `/store/coupons` 🔒
- **Description**: Create new coupon

#### Update Coupon
- **PUT** `/store/coupons/:id` 🔒
- **Description**: Update coupon by ID

#### Delete Coupon
- **DELETE** `/store/coupons/:id` 🔒
- **Description**: Delete coupon by ID

### Gift Card Operations

#### Get All Gift Cards
- **GET** `/store/giftcards` 🔒
- **Description**: Retrieve all gift cards

#### Create Gift Card
- **POST** `/store/giftcards` 🔒
- **Description**: Create new gift card

#### Update Gift Card
- **PUT** `/store/giftcards/:id` 🔒
- **Description**: Update gift card by ID

#### Delete Gift Card
- **DELETE** `/store/giftcards/:id` 🔒
- **Description**: Delete gift card by ID

---

## 📂 Category Management APIs

### Get All Categories
- **GET** `/categories` 🔒
- **Description**: Retrieve all categories

### Create Category
- **POST** `/categories` 🔒
- **Description**: Create new category
- **Body**:
```json
{
  "name": "Category Name",
  "description": "Category Description"
}
```

### Update Category
- **PUT** `/categories/:id` 🔒
- **Description**: Update category by ID

### Delete Category
- **DELETE** `/categories/:id` 🔒
- **Description**: Delete category by ID

---

## 🚚 Delivery Management APIs

### Get All Delivery Boys
- **GET** `/delivery` 🔒
- **Description**: Retrieve all delivery personnel

### Create Delivery Boy
- **POST** `/delivery` 🔒
- **Description**: Create new delivery personnel
- **Body**:
```json
{
  "name": "Delivery Person Name",
  "phone": "+1234567890",
  "status": "active"
}
```

### Update Delivery Boy
- **PUT** `/delivery/:id` 🔒
- **Description**: Update delivery personnel by ID

### Delete Delivery Boy
- **DELETE** `/delivery/:id` 🔒
- **Description**: Delete delivery personnel by ID

---

## 🔧 Utility APIs

### Health Check
- **GET** `/health`
- **Description**: Check server status
- **Response**:
```json
{
  "status": "OK",
  "message": "Server running"
}
```

---

## 📝 Notes

### Authentication
- 🔒 indicates protected routes requiring JWT token
- Default admin credentials: `admin@admin.com` / `admin123`
- JWT tokens expire in 24 hours

### Error Responses
All APIs return consistent error format:
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

### Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error

### Route Configuration
**Note**: The current `app.js` only implements basic admin authentication routes. To enable all documented APIs, the following routes need to be imported and configured in the main application:

```javascript
// Add to app.js
import adminRoutes from './Server/routes/adminRoutes.js';
import categoryRoutes from './Server/routes/categoryRoutes.js';
import deliveryRoutes from './Server/routes/deliveryRoutes.js';
import orderRoutes from './Server/routes/orderRoutes.js';
import paymentRoutes from './Server/routes/paymentRoutes.js';
import productRoutes from './Server/routes/productRoutes.js';
import storeRoutes from './Server/routes/storeRoutes.js';

// Configure routes
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/store', storeRoutes);
```

### Frontend Integration
The frontend uses these APIs through:
- `axios.js` - Base API configuration
- `productApi.js` - Product-specific API calls
- Components make direct API calls using the configured axios instance