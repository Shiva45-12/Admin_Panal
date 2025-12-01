# Users & Store Management API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require JWT token:
```
Authorization: Bearer <token>
```

---

## 👥 Users API

### Get All Users
- **GET** `/admin/users` 🔒
- **Response**:
```json
[
  {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Create User
- **POST** `/admin/users` 🔒
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
- **Body**:
```json
{
  "name": "Updated Name",
  "status": "inactive"
}
```

### Delete User
- **DELETE** `/admin/users/:id` 🔒
- **Response**:
```json
{
  "message": "User deleted successfully"
}
```

---

## 🏪 Store Management API

### Stores

#### Get All Stores
- **GET** `/store/stores` 🔒
- **Response**:
```json
[
  {
    "id": "store_id",
    "name": "Store Name",
    "address": "Store Address",
    "phone": "+1234567890",
    "status": "active"
  }
]
```

#### Create Store
- **POST** `/store/stores` 🔒
- **Body**:
```json
{
  "name": "New Store",
  "address": "123 Main St",
  "phone": "+1234567890",
  "status": "active"
}
```

#### Update Store
- **PUT** `/store/stores/:id` 🔒

#### Delete Store
- **DELETE** `/store/stores/:id` 🔒

### Coupons

#### Get All Coupons
- **GET** `/store/coupons` 🔒

#### Create Coupon
- **POST** `/store/coupons` 🔒
- **Body**:
```json
{
  "code": "SAVE20",
  "discount": 20,
  "type": "percentage",
  "storeId": "store_id",
  "expiryDate": "2024-12-31"
}
```

#### Update Coupon
- **PUT** `/store/coupons/:id` 🔒

#### Delete Coupon
- **DELETE** `/store/coupons/:id` 🔒

### Gift Cards

#### Get All Gift Cards
- **GET** `/store/giftcards` 🔒

#### Create Gift Card
- **POST** `/store/giftcards` 🔒
- **Body**:
```json
{
  "code": "GIFT100",
  "amount": 100,
  "status": "active"
}
```

#### Update Gift Card
- **PUT** `/store/giftcards/:id` 🔒

#### Delete Gift Card
- **DELETE** `/store/giftcards/:id` 🔒

---

## 📝 Notes

- 🔒 = Protected routes requiring JWT token
- All APIs return consistent error format
- Status codes: 200 (Success), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)