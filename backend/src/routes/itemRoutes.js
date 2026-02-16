import express from 'express';
import { getItems, getItem, createItem, updateItem, deleteItem } from '../controllers/itemController.js';
import { authenticate } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';
import { cacheMiddleware } from '../utils/cache.js';

const router = express.Router();

router.use(authenticate);

router.get('/', cacheMiddleware(30), validate(schemas.pagination), getItems);
router.get('/:id', getItem);
router.post('/', validate(schemas.createItem), createItem);
router.put('/:id', validate(schemas.updateItem), updateItem);
router.delete('/:id', deleteItem);

export default router;
