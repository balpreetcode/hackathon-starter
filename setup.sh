#!/bin/bash

echo "🚀 Hackathon Starter Setup"
echo "=========================="
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Setup environment
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
fi

# Initialize database
echo "🗄️  Initializing database..."
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Setup environment
if [ ! -f .env ]; then
    echo "📝 Creating frontend .env file..."
    cp .env.example .env
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development servers:"
echo "  npm run dev"
echo ""
echo "Or start them separately:"
echo "  Backend:  cd backend && npm run dev"
echo "  Frontend: cd frontend && npm run dev"
echo ""
echo "Default users (after seeding):"
echo "  Admin:   admin@example.com / admin123"
echo "  Manager: manager@example.com / manager123"
echo "  User:    user@example.com / user123"
echo ""
