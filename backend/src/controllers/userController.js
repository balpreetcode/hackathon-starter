import bcrypt from 'bcrypt';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';
import db from '../config/database.js';

export const getUsers = asyncWrapper(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search = '',
  } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  let users = db.users.findAll({ search });

  // Sort
  users.sort((a, b) => {
    const aVal = a[sortBy] || '';
    const bVal = b[sortBy] || '';
    if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const total = users.length;

  // Paginate
  users = users.slice(skip, skip + limitNum);

  // Strip sensitive fields
  const safeUsers = users.map(({ password, refreshToken, ...u }) => u);

  res.json({
    success: true,
    data: {
      users: safeUsers,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    },
  });
});

export const getUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const user = db.users.findById(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const itemCount = db.items.findAll().filter((i) => i.userId === id).length;

  const { password, refreshToken, ...safeUser } = user;

  res.json({
    success: true,
    data: { ...safeUser, _count: { items: itemCount } },
  });
});

export const updateUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { email, name, role } = req.body;

  if (req.user.id !== id && req.user.role !== 'ADMIN') {
    throw new ForbiddenError('You can only update your own profile');
  }

  if (role && req.user.role !== 'ADMIN') {
    throw new ForbiddenError('Only admins can change user roles');
  }

  const updates = {};
  if (email) updates.email = email;
  if (name) updates.name = name;
  if (role) updates.role = role;

  const user = db.users.update(id, updates);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const { password, refreshToken, ...safeUser } = user;

  res.json({
    success: true,
    message: 'User updated successfully',
    data: safeUser,
  });
});

export const deleteUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const deleted = db.users.delete(id);
  if (!deleted) {
    throw new NotFoundError('User not found');
  }

  res.json({
    success: true,
    message: 'User deleted successfully',
  });
});
