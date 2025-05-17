import express from 'express'
const router = express.Router()
import { createCategory, getAllCategories, deleteCategory } from '../controllers/categoryController.js'

import { protect, admin } from '../middleware/authMiddleware.js';


router.post('/', protect, admin, createCategory)
router.get('/', getAllCategories)
router.delete('/:id', protect, admin, deleteCategory)

export default router
