import { asyncWrapper } from '../utils/asyncWrapper.js';
import { ValidationError } from '../utils/errors.js';
import db from '../config/database.js';

export const uploadFile = asyncWrapper(async (req, res) => {
  if (!req.file) {
    throw new ValidationError('No file uploaded');
  }

  const file = db.files.create({
    originalName: req.file.originalname,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    uploadedBy: req.user?.id,
  });

  res.status(201).json({
    success: true,
    message: 'File uploaded successfully',
    data: {
      id: file.id,
      originalName: file.originalName,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`,
      createdAt: file.createdAt,
    },
  });
});

export const getFiles = asyncWrapper(async (req, res) => {
  const files = db.files.findAll().slice(0, 50);

  res.json({
    success: true,
    data: files.map((file) => ({
      ...file,
      url: `/uploads/${file.filename}`,
    })),
  });
});
