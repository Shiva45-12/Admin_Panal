<<<<<<< HEAD
# Admin Panel - Full Stack Application

A complete admin panel with user management, authentication, and dashboard features.

## Features

- **Authentication**: Secure login/logout with JWT tokens
- **Dashboard**: Real-time statistics and overview
- **User Management**: Full CRUD operations for users
- **Responsive Design**: Works on desktop and mobile
- **Role-based Access**: Admin and user roles
- **Status Management**: Active/inactive user status

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React 19
- React Router for navigation
- Axios for API calls
- Context API for state management
- CSS3 for styling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB service (if using local MongoDB)

4. Create default admin user:
```bash
npm run init-admin
```

5. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd Frontend/MyAdmin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Default Admin Credentials

- **Email**: admin@admin.com
- **Password**: admin123

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Create new admin

### Dashboard
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

### User Management
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## Project Structure

```
Admin_Panel/
├── Backend/
│   ├── Server/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   ├── config/
│   ├── scripts/
│   ├── app.js
│   ├── server.js
│   └── package.json
└── Frontend/
    └── MyAdmin/
        ├── src/
        │   ├── api/
        │   ├── components/
        │   ├── context/
        │   ├── App.jsx
        │   └── main.jsx
        ├── public/
        └── package.json
```

## Usage

1. Start both backend and frontend servers
2. Open browser and go to `http://localhost:5173`
3. Login with default admin credentials
4. Access dashboard to view statistics
5. Navigate to Users section to manage users
6. Create, edit, or delete users as needed

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes
- CORS configuration
- Input validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
=======
# Admin_Panal
This is real Project
>>>>>>> 2dac549dffdd215f9240fffca930a2689d428bcf
