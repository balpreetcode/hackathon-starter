# 🚀 Hackathon Starter

A production-ready full-stack starter template with authentication, RBAC, dashboard analytics, Kanban board, and a beautiful UI. Zero-config database — just clone and run.

## 🔴 Live Demo

**[https://earn-motel-pound-solve.trycloudflare.com](https://earn-motel-pound-solve.trycloudflare.com)**

Login: `admin@example.com` / `admin123`

## 🔧 Tech Stack

### Frontend
- **React 18** — UI framework
- **Vite** — Build tool (fast HMR)
- **Tailwind CSS** — Utility-first styling (violet/indigo theme)
- **Recharts** — Charts & graphs (line, bar, area, pie)
- **React Router v6** — Client-side routing
- **Axios** — HTTP client with interceptors
- **Socket.io Client** — Real-time WebSocket

### Backend
- **Node.js + Express.js** — REST API server
- **JSON File DB** — Zero-config, no installation needed (data stored in `backend/data/db.json`)
- **JWT (jsonwebtoken)** — Access + refresh token authentication
- **bcrypt** — Password hashing
- **Zod** — Request validation
- **Socket.io** — Real-time notifications via WebSocket
- **Multer** — File upload handling
- **Helmet + CORS + compression** — Security & performance middleware
- **express-rate-limit** — Rate limiting on auth routes

### Infrastructure
- **Docker + docker-compose** — Container-ready (app + PostgreSQL)
- **Cloudflare Tunnel** — Temporary free hosting
- **Nginx** — Reverse proxy config included

## ✨ Features

- 🔐 **JWT Auth** — Login, register, refresh tokens, logout
- 👥 **RBAC** — Admin / Manager / User roles with route guards
- 📊 **Dashboard** — Stats cards, line chart, bar chart, area chart, pie chart, recent activity
- 🗂️ **Kanban Board** — Drag & drop cards between To Do / In Progress / Done columns
- 📋 **Data Tables** — Sortable, filterable, paginated with search
- 📤 **File Upload** — Drag-and-drop with type/size validation
- 🌓 **Dark Mode** — Toggle with smooth transitions
- 📱 **Responsive** — Mobile-friendly collapsible sidebar
- 🔔 **Real-time Notifications** — Socket.io powered toast alerts
- ⏳ **Loading States** — Skeleton loaders & spinners
- 🏠 **Landing Page** — Public showcase page with animated counters, 6 chart types, feature cards, and CTA buttons

## 🏁 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/balpreetcode/hackathon-starter.git
cd hackathon-starter

# Run setup (installs deps + seeds database)
bash setup.sh
```

Or manually:

```bash
# Install dependencies
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Seed the database with sample data
cd backend && node seed.js && cd ..

# Start both servers
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:6300

### Default Users

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Manager | manager@example.com | manager123 |
| User | user@example.com | user123 |

## 📁 Project Structure

```
hackathon-starter/
├── backend/
│   ├── data/                  # JSON file database (auto-created)
│   ├── seed.js                # Database seeder
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js    # JSON DB engine
│   │   │   └── env.js         # Environment config
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Auth, RBAC, validation, rate-limit
│   │   ├── routes/            # API route definitions
│   │   ├── utils/             # JWT, errors, cache, async wrapper
│   │   └── server.js          # Express app entry point
│   ├── uploads/               # Uploaded files
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Layout.jsx     # Sidebar + top bar
│   │   │   ├── DataTable.jsx  # Sortable/filterable table
│   │   │   ├── FileUpload.jsx # Drag & drop upload
│   │   │   ├── Toast.jsx      # Notification toasts
│   │   │   └── ...
│   │   ├── contexts/          # React contexts (Auth, Theme, Toast)
│   │   ├── pages/
│   │   │   ├── Landing.jsx    # Public showcase page
│   │   │   ├── Dashboard.jsx  # Analytics dashboard
│   │   │   ├── Kanban.jsx     # Drag & drop kanban board
│   │   │   ├── Items.jsx      # CRUD data table
│   │   │   ├── Users.jsx      # User management
│   │   │   ├── Admin.jsx      # Admin panel
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── utils/             # API client, socket service
│   │   └── App.jsx            # Routes & providers
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── docker-compose.yml
├── setup.sh
└── README.md
```

## 📝 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login (returns JWT) |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout (clears refresh token) |
| GET | `/api/auth/me` | Get current user |

### Users (Protected)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users` | Manager, Admin | List users (paginated) |
| GET | `/api/users/:id` | Manager, Admin | Get user details |
| PUT | `/api/users/:id` | Owner, Admin | Update user |
| DELETE | `/api/users/:id` | Admin | Delete user |

### Items (CRUD)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | List items (pagination, search, filter by status/category) |
| GET | `/api/items/:id` | Get item |
| POST | `/api/items` | Create item |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |

### Files
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload file (multipart) |
| GET | `/api/upload` | List uploaded files |

## 🎯 Customization

- **Add new models**: Edit `backend/src/config/database.js` — add a new collection
- **Add API routes**: Create in `backend/src/routes/`, register in `server.js`
- **Add pages**: Create in `frontend/src/pages/`, add route in `App.jsx`, add to sidebar in `Layout.jsx`
- **Change theme**: Edit `frontend/tailwind.config.js` (primary color palette)
- **Switch to PostgreSQL**: Replace JSON DB in `database.js` with a pg/knex/prisma client

## 🐳 Docker

```bash
docker-compose up
```

Starts the app + PostgreSQL. Backend on port 6300, frontend on port 5173.

## 📄 License

MIT
