import Order from '../models/Order'
import CartItem from '../models/CartItem'

export const placeOrder = async (req, res) => {
  const { shippingAddress } = req.body
  const userId = req.user._id

  const cartItems = await CartItem.find({ user: userId }).populate('product')

  if (cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' })
  }

  const items = cartItems.map(item => ({
    product: item.product._id,
    quantity: item.quantity
  }))

  const totalAmount = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  const order = await Order.create({
    user: userId,
    items,
    totalAmount,
    shippingAddress
  })

  await CartItem.deleteMany({ user: userId })

  res.status(201).json(order)
}

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product')
  res.json(orders)
}

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').populate('items.product')
  res.json(orders)
}
