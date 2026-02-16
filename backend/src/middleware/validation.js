import { z } from 'zod';

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Common validation schemas
export const schemas = {
  register: z.object({
    body: z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      name: z.string().min(2, 'Name must be at least 2 characters'),
    }),
  }),

  login: z.object({
    body: z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(1, 'Password is required'),
    }),
  }),

  updateUser: z.object({
    params: z.object({
      id: z.string().uuid('Invalid user ID'),
    }),
    body: z.object({
      email: z.string().email().optional(),
      name: z.string().min(2).optional(),
      role: z.enum(['USER', 'MANAGER', 'ADMIN']).optional(),
    }),
  }),

  createItem: z.object({
    body: z.object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().optional(),
      status: z.string().optional(),
      category: z.string().optional(),
      priority: z.string().optional(),
    }),
  }),

  updateItem: z.object({
    params: z.object({
      id: z.string().uuid('Invalid item ID'),
    }),
    body: z.object({
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      status: z.string().optional(),
      category: z.string().optional(),
      priority: z.string().optional(),
    }),
  }),

  pagination: z.object({
    query: z.object({
      page: z.string().regex(/^\d+$/).transform(Number).optional(),
      limit: z.string().regex(/^\d+$/).transform(Number).optional(),
      sortBy: z.string().optional(),
      sortOrder: z.enum(['asc', 'desc']).optional(),
      search: z.string().optional(),
      status: z.string().optional(),
      category: z.string().optional(),
    }),
  }),
};
