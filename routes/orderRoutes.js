// const router = express.Router()
// const { placeOrder, getMyOrders, getAllOrders }  from ('../controllers/orderController')
// const { protect, admin }  from ('../middleware/authMiddleware')

// router.post('/', protect, placeOrder)
// router.get('/my', protect, getMyOrders)
// router.get('/', protect, admin, getAllOrders)

// module.exports = router



import express from 'express'
import Order from '../models/Order.js'

const router = express.Router()

// Create Order
router.post('/', async (req, res) => {
  try {
    const { userId, items, shippingInfo, totalPrice } = req.body

    const order = new Order({
      userId,
      items,
      shippingInfo,
      totalPrice
    })

    await order.save()

    res.status(201).json(order)
  } catch (err) {
    console.error('Error placing order:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId').sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Failed to get orders' })
  }
})

// Get user’s orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('items.productId')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user orders' })
  }
})

// Update order status
router.put('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' })
  }
})


export default router
