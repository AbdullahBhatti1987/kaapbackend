import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import CartItem from '../models/CartItem.js'

const router = express.Router()

router.get('/', protect, async (req, res) => {
  try {
    const items = await CartItem.find({ user: req.user._id }).populate('product')
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart items' })
  }
})

router.post('/', protect, async (req, res) => {
  try {
    const { product, quantity, price, image } = req.body
    let existingItem = await CartItem.findOne({ user: req.user._id, product })

    if (existingItem) {
      existingItem.quantity += quantity
      await existingItem.save()
      return res.json(existingItem)
    }

    const newItem = new CartItem({
      user: req.user._id,
      product,
      quantity,
      price,
      image
    })

    await newItem.save()
    res.status(201).json(newItem)
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart' })
  }
})

router.put('/:id', protect, async (req, res) => {
  try {
    const updatedItem = await CartItem.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    )
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' })
    res.json(updatedItem)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item' })
  }
})

router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedItem = await CartItem.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' })
    res.json({ message: 'Item removed' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item' })
  }
})

export default router
