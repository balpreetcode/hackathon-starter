import bcrypt from 'bcryptjs';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { UnauthorizedError, ConflictError } from '../utils/errors.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import db from '../config/database.js';

export const register = asyncWrapper(async (req, res) => {
  const { email, password, name } = req.body;

  const existingUser = db.users.findByEmail(email);
  if (existingUser) {
    throw new ConflictError('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = db.users.create({
    email,
    password: hashedPassword,
    name,
    role: 'USER',
  });

  const accessToken = generateAccessToken({ userId: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user.id });

  db.users.update(user.id, { refreshToken });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
      accessToken,
      refreshToken,
    },
  });
});

export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = db.users.findByEmail(email);
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const accessToken = generateAccessToken({ userId: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user.id });

  db.users.update(user.id, { refreshToken });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
      accessToken,
      refreshToken,
    },
  });
});

export const refresh = asyncWrapper(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new UnauthorizedError('Refresh token required');
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = db.users.findById(decoded.userId);
  if (!user || user.refreshToken !== refreshToken) {
    throw new UnauthorizedError('Invalid refresh token');
  }

  const accessToken = generateAccessToken({ userId: user.id, role: user.role });
  const newRefreshToken = generateRefreshToken({ userId: user.id });

  db.users.update(user.id, { refreshToken: newRefreshToken });

  res.json({
    success: true,
    data: {
      accessToken,
      refreshToken: newRefreshToken,
    },
  });
});

export const logout = asyncWrapper(async (req, res) => {
  db.users.update(req.user.id, { refreshToken: null });

  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

export const me = asyncWrapper(async (req, res) => {
  const user = db.users.findById(req.user.id);

  res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});
