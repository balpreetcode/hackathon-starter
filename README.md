# 🚀 Hackathon Starter

A production-ready full-stack starter template with authentication, RBAC, real-time features, and a beautiful UI.

## ✨ Features

### Backend
- 🔐 JWT Authentication (access + refresh tokens)
- 👥 Role-Based Access Control (Admin, Manager, User)
- 📦 Full CRUD API with pagination, filtering, sorting
- 📁 File Upload with validation
- ⚡ WebSocket (Socket.io) for real-time notifications
- 🛡️ Rate limiting, CORS, Helmet, Compression
- 💾 Caching middleware (Redis-ready)
- ✅ Zod validation
- 🐳 Docker support

### Frontend
- 🎨 Beautiful Tailwind UI with Violet/Indigo theme
- 📊 Interactive dashboard with charts (Recharts)
- 🌙 Dark mode support
- 📱 Fully responsive
- 🔒 Protected routes with RBAC
- 📋 Advanced data table (sort, filter, search, paginate)
- 📤 Drag-and-drop file upload
- 🔔 Real-time notifications
- 🍞 Toast notifications
- ⏳ Loading states & skeleton loaders

## 🏁 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install all dependencies
npm run install:all

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Initialize database
cd backend
npx prisma migrate dev
npx prisma db seed
cd ..

# Start development servers
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Default Users

After seeding:
- **Admin**: admin@example.com / admin123
- **Manager**: manager@example.com / manager123
- **User**: user@example.com / user123

## 🐳 Docker

```bash
# Start with PostgreSQL
docker-compose up

# In another terminal, run migrations
cd backend
npx prisma migrate deploy
npx prisma db seed
```

## 📁 Project Structure

```
hackathon-starter/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── uploads/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🔧 Tech Stack

### Backend
- Express.js
- Prisma ORM (SQLite/PostgreSQL)
- JWT + bcrypt
- Socket.io
- Zod
- Multer

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Recharts
- Socket.io Client
- Axios

## 📝 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout

### Users (Protected)
- `GET /api/users` - List users (paginated)
- `GET /api/users/:id` - Get user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

### Items (Example CRUD)
- `GET /api/items` - List items (with pagination, search, filter)
- `GET /api/items/:id` - Get item
- `POST /api/items` - Create item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### File Upload
- `POST /api/upload` - Upload file

## 🎯 Customization

1. **Database**: Edit `backend/prisma/schema.prisma`
2. **API Routes**: Add routes in `backend/src/routes/`
3. **UI Components**: Add to `frontend/src/components/`
4. **Theme**: Modify `frontend/tailwind.config.js`

## 🚀 Deployment

### Backend
- Set `DATABASE_URL` to PostgreSQL
- Set `NODE_ENV=production`
- Run `npm run build && npm start`

### Frontend
- Run `npm run build`
- Serve `dist/` folder with any static host

## 📄 License

MIT
