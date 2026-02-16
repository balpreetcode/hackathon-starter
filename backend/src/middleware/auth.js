import { UnauthorizedError, ForbiddenError } from '../utils/errors.js';
import { verifyAccessToken } from '../utils/jwt.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import db from '../config/database.js';

export const authenticate = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided');
  }

  const token = authHeader.substring(7);
  const decoded = verifyAccessToken(token);

  const user = db.users.findById(decoded.userId);
  if (!user) {
    throw new UnauthorizedError('User not found');
  }

  req.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
  };
  next();
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    if (roles.length && !roles.includes(req.user.role)) {
      throw new ForbiddenError('Insufficient permissions');
    }

    next();
  };
};
