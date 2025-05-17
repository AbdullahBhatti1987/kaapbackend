// import express from 'express'
// const router = express.Router()
// import {
//   createProduct,
//   getAllProducts,
//   getProductByCategory,
//   getProductById
// }  from '../controllers/productController.js'

// // import { protect, admin } from '../middleware/authMiddleware.js'
// import Product from '../models/Product'

// // router.post('/', protect, admin, createProduct)
// router.get('/', getAllProducts)
// router.get('/category/:categoryId', getProductByCategory)
// router.get('/:id', getProductById)




// // Add product
// router.post('/',  async (req, res) => {
// // router.post('/',  protect, admin, createProduct , async (req, res) => {
//   try {
//     const product = new Product(req.body)
//     await product.save()
//     res.status(201).json(product)
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to add product' })
//   }
// })

// // Update product
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     if (!updatedProduct) return res.status(404).json({ message: 'Product not found' })
//     res.json(updatedProduct)
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to update product' })
//   }
// })

// // Delete product
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id)
//     if (!deletedProduct) return res.status(404).json({ message: 'Product not found' })
//     res.json({ message: 'Product deleted' })
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to delete product' })
//   }
// })



// module.exports = router


import express from 'express'
const router = express.Router()

import {
  createProduct,
  getAllProducts,
  getProductByCategory,
  getProductById
} from '../controllers/productController.js'

import Product from '../models/Product.js'

// router.post('/', protect, admin, createProduct)
router.get('/', getAllProducts)
router.get('/category/:categoryId', getProductByCategory)
router.get('/:id', getProductById)

router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' })
    res.json(updatedProduct)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' })
  }
})

export default router
