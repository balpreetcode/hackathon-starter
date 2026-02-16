import { asyncWrapper } from '../utils/asyncWrapper.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';
import db from '../config/database.js';

export const getItems = asyncWrapper(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search = '',
    status,
    category,
  } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  let items = db.items.findAll({ search, status, category });

  // Sort
  items.sort((a, b) => {
    const aVal = a[sortBy] || '';
    const bVal = b[sortBy] || '';
    if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const total = items.length;

  // Paginate
  items = items.slice(skip, skip + limitNum);

  // Attach user info
  const itemsWithUser = items.map((item) => {
    const user = db.users.findById(item.userId);
    return {
      ...item,
      user: user
        ? { id: user.id, name: user.name, email: user.email, avatar: user.avatar }
        : null,
    };
  });

  res.json({
    success: true,
    data: {
      items: itemsWithUser,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    },
  });
});

export const getItem = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const item = db.items.findById(id);
  if (!item) {
    throw new NotFoundError('Item not found');
  }

  const user = db.users.findById(item.userId);

  res.json({
    success: true,
    data: {
      ...item,
      user: user
        ? { id: user.id, name: user.name, email: user.email, avatar: user.avatar }
        : null,
    },
  });
});

export const createItem = asyncWrapper(async (req, res) => {
  const { title, description, status, category, priority } = req.body;

  const item = db.items.create({
    title,
    description,
    status: status || 'active',
    category,
    priority,
    userId: req.user.id,
  });

  const user = db.users.findById(req.user.id);

  res.status(201).json({
    success: true,
    message: 'Item created successfully',
    data: {
      ...item,
      user: user
        ? { id: user.id, name: user.name, email: user.email, avatar: user.avatar }
        : null,
    },
  });
});

export const updateItem = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { title, description, status, category, priority } = req.body;

  const item = db.items.findById(id);
  if (!item) {
    throw new NotFoundError('Item not found');
  }

  if (item.userId !== req.user.id && !['ADMIN', 'MANAGER'].includes(req.user.role)) {
    throw new ForbiddenError('You can only update your own items');
  }

  const updates = {};
  if (title) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (status) updates.status = status;
  if (category) updates.category = category;
  if (priority) updates.priority = priority;

  const updatedItem = db.items.update(id, updates);

  const user = db.users.findById(updatedItem.userId);

  res.json({
    success: true,
    message: 'Item updated successfully',
    data: {
      ...updatedItem,
      user: user
        ? { id: user.id, name: user.name, email: user.email, avatar: user.avatar }
        : null,
    },
  });
});

export const deleteItem = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const item = db.items.findById(id);
  if (!item) {
    throw new NotFoundError('Item not found');
  }

  if (item.userId !== req.user.id && !['ADMIN', 'MANAGER'].includes(req.user.role)) {
    throw new ForbiddenError('You can only delete your own items');
  }

  db.items.delete(id);

  res.json({
    success: true,
    message: 'Item deleted successfully',
  });
});
