import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '..', '..', 'data', 'db.json');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Default empty DB structure
const defaultDB = { users: [], items: [], files: [] };

function load() {
  try {
    if (fs.existsSync(DB_PATH)) {
      return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    }
  } catch (e) {
    console.error('DB load error, resetting:', e.message);
  }
  return structuredClone(defaultDB);
}

function save(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Simple query helpers that mimic Prisma-like patterns
const db = {
  _data: load(),

  _save() {
    save(this._data);
  },

  // ---- Users ----
  users: {
    findAll(filter = {}) {
      let results = db._data.users;
      if (filter.search) {
        const s = filter.search.toLowerCase();
        results = results.filter(
          (u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
        );
      }
      return results;
    },

    findById(id) {
      return db._data.users.find((u) => u.id === id) || null;
    },

    findByEmail(email) {
      return db._data.users.find((u) => u.email === email) || null;
    },

    create(data) {
      const now = new Date().toISOString();
      const user = {
        id: randomUUID(),
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role || 'USER',
        avatar: data.avatar || null,
        refreshToken: data.refreshToken || null,
        createdAt: now,
        updatedAt: now,
      };
      db._data.users.push(user);
      db._save();
      return user;
    },

    update(id, data) {
      const idx = db._data.users.findIndex((u) => u.id === id);
      if (idx === -1) return null;
      Object.assign(db._data.users[idx], data, { updatedAt: new Date().toISOString() });
      db._save();
      return db._data.users[idx];
    },

    delete(id) {
      const idx = db._data.users.findIndex((u) => u.id === id);
      if (idx === -1) return false;
      db._data.users.splice(idx, 1);
      // Also delete user's items
      db._data.items = db._data.items.filter((i) => i.userId !== id);
      db._save();
      return true;
    },

    count(filter = {}) {
      return this.findAll(filter).length;
    },
  },

  // ---- Items ----
  items: {
    findAll(filter = {}) {
      let results = db._data.items;
      if (filter.search) {
        const s = filter.search.toLowerCase();
        results = results.filter(
          (i) =>
            i.title.toLowerCase().includes(s) ||
            (i.description && i.description.toLowerCase().includes(s))
        );
      }
      if (filter.status) results = results.filter((i) => i.status === filter.status);
      if (filter.category) results = results.filter((i) => i.category === filter.category);
      return results;
    },

    findById(id) {
      return db._data.items.find((i) => i.id === id) || null;
    },

    create(data) {
      const now = new Date().toISOString();
      const item = {
        id: randomUUID(),
        title: data.title,
        description: data.description || null,
        status: data.status || 'active',
        category: data.category || null,
        priority: data.priority || null,
        userId: data.userId,
        createdAt: now,
        updatedAt: now,
      };
      db._data.items.push(item);
      db._save();
      return item;
    },

    update(id, data) {
      const idx = db._data.items.findIndex((i) => i.id === id);
      if (idx === -1) return null;
      Object.assign(db._data.items[idx], data, { updatedAt: new Date().toISOString() });
      db._save();
      return db._data.items[idx];
    },

    delete(id) {
      const idx = db._data.items.findIndex((i) => i.id === id);
      if (idx === -1) return false;
      db._data.items.splice(idx, 1);
      db._save();
      return true;
    },

    count(filter = {}) {
      return this.findAll(filter).length;
    },
  },

  // ---- Files ----
  files: {
    findAll() {
      return [...db._data.files].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },

    create(data) {
      const file = {
        id: randomUUID(),
        originalName: data.originalName,
        filename: data.filename,
        mimetype: data.mimetype,
        size: data.size,
        path: data.path,
        uploadedBy: data.uploadedBy || null,
        createdAt: new Date().toISOString(),
      };
      db._data.files.push(file);
      db._save();
      return file;
    },
  },
};

export default db;
