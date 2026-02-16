# 🚀 Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm installed

## Setup

### Option 1: Automatic Setup (Recommended)

```bash
# Run the setup script
./setup.sh
```

### Option 2: Manual Setup

```bash
# Install all dependencies
npm run install:all

# Setup environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Initialize database
cd backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
cd ..
```

## Run Development Servers

### Both servers at once:
```bash
npm run dev
```

### Separately:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Access the App

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## Default Login Credentials

After seeding the database:

| Role    | Email                  | Password   |
|---------|------------------------|------------|
| Admin   | admin@example.com      | admin123   |
| Manager | manager@example.com    | manager123 |
| User    | user@example.com       | user123    |

## Test the Features

### ✅ Authentication
1. Login with any of the default accounts
2. Try registering a new account
3. Test the "Forgot Password" UI

### ✅ Dashboard
- View stats cards
- Check out the interactive charts
- See recent activity feed

### ✅ Items Management
- Filter and search items
- Sort by different columns
- Pagination controls
- Upload files (drag & drop)

### ✅ Users (Manager/Admin only)
- View all users
- Search and sort users
- See role badges

### ✅ Admin Panel (Admin only)
- Access admin-only features
- View system stats

### ✅ Real-time Features
- Open browser console
- Watch for WebSocket connection
- Real-time notifications work automatically

### ✅ Dark Mode
- Click the moon/sun icon in the header
- Theme persists across sessions

## Project Structure

```
hackathon-starter/
├── backend/
│   ├── prisma/          # Database schema & seed
│   ├── src/
│   │   ├── config/      # Environment & DB config
│   │   ├── controllers/ # Route handlers
│   │   ├── middleware/  # Auth, validation, etc.
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Helpers (JWT, cache, errors)
│   │   └── server.js    # Express + Socket.io setup
│   └── uploads/         # File uploads directory
│
└── frontend/
    └── src/
        ├── components/  # Reusable UI components
        ├── contexts/    # React contexts (Auth, Theme, Toast)
        ├── pages/       # Page components
        └── utils/       # API client, socket

```

## Customization Tips

### Change Theme Colors
Edit `frontend/tailwind.config.js`:
```js
primary: {
  500: '#8b5cf6',  // Change this!
  600: '#7c3aed',
  // ...
}
```

### Add New API Routes
1. Create controller in `backend/src/controllers/`
2. Create route in `backend/src/routes/`
3. Register route in `backend/src/server.js`

### Add New Pages
1. Create page in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Add nav item in `frontend/src/components/Layout.jsx`

### Modify Database Schema
1. Edit `backend/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name your_migration_name`
3. Update seed file if needed

## Using PostgreSQL Instead of SQLite

1. Start PostgreSQL:
   ```bash
   docker-compose up postgres
   ```

2. Update `backend/.env`:
   ```
   DATABASE_URL="postgresql://hackathon:hackathon_password@localhost:5432/hackathon_db"
   ```

3. Run migrations:
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma db seed
   ```

## Deployment

### Backend
- Set environment variables
- Change `DATABASE_URL` to production PostgreSQL
- Set `NODE_ENV=production`
- Run `npm start`

### Frontend
- Run `npm run build`
- Serve the `dist/` folder with Nginx, Vercel, Netlify, etc.

## Need Help?

- Check `README.md` for full documentation
- Backend runs on port 3000
- Frontend runs on port 5173
- Database file: `backend/prisma/dev.db` (SQLite)

## Next Steps

🎨 **Customize**: Change colors, add your logo, modify the UI  
🔧 **Extend**: Add new features, models, and routes  
🚀 **Deploy**: Push to production when ready  
🏆 **Win**: Use this as your hackathon base!

---

Happy hacking! 🎉
