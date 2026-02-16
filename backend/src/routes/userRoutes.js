import express from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';
import { cacheMiddleware } from '../utils/cache.js';

const router = express.Router();

router.use(authenticate);

router.get('/', authorize('ADMIN', 'MANAGER'), cacheMiddleware(60), validate(schemas.pagination), getUsers);
router.get('/:id', getUser);
router.put('/:id', validate(schemas.updateUser), updateUser);
router.delete('/:id', authorize('ADMIN'), deleteUser);

export default router;
