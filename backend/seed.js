import bcrypt from 'bcryptjs';
import db from './src/config/database.js';

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  db._data.users = [];
  db._data.items = [];
  db._data.files = [];

  // Create users
  const admin = db.users.create({
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
    name: 'Admin User',
    role: 'ADMIN',
  });

  const manager = db.users.create({
    email: 'manager@example.com',
    password: await bcrypt.hash('manager123', 10),
    name: 'Manager User',
    role: 'MANAGER',
  });

  const user = db.users.create({
    email: 'user@example.com',
    password: await bcrypt.hash('user123', 10),
    name: 'Regular User',
    role: 'USER',
  });

  console.log('Created users:', { admin: admin.email, manager: manager.email, user: user.email });

  // Create sample items
  const categories = ['Technology', 'Design', 'Marketing', 'Sales', 'Engineering'];
  const priorities = ['low', 'medium', 'high', 'critical'];
  const statuses = ['active', 'inactive', 'pending', 'completed'];
  const users = [admin, manager, user];

  for (let i = 0; i < 50; i++) {
    db.items.create({
      title: `Sample Item ${i + 1}`,
      description: `This is a description for sample item ${i + 1}. It contains useful information about the item.`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  console.log('Created 50 sample items');
  console.log('🌱 Seed complete!');
}

main().catch(console.error);
