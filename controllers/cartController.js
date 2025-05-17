import CartItem from '../models/CartItem';

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body
  const userId = req.user._id

  const existing = await CartItem.findOne({ user: userId, product: productId })

  if (existing) {
    existing.quantity += quantity
    await existing.save()
    return res.json(existing)
  }

  const item = await CartItem.create({ user: userId, product: productId, quantity })
  res.status(201).json(item)
}

export const getUserCart = async (req, res) => {
  const cart = await CartItem.find({ user: req.user._id }).populate('product')
  res.json(cart)
}

export const updateCartItem = async (req, res) => {
  const item = await CartItem.findById(req.params.id)

  if (item && item.user.toString() === req.user._id.toString()) {
    item.quantity = req.body.quantity
    await item.save()
    res.json(item)
  } else {
    res.status(404).json({ message: 'Cart item not found or unauthorized' })
  }
}

export const removeCartItem = async (req, res) => {
  const item = await CartItem.findById(req.params.id)

  if (item && item.user.toString() === req.user._id.toString()) {
    await item.deleteOne()
    res.json({ message: 'Item removed from cart' })
  } else {
    res.status(404).json({ message: 'Cart item not found or unauthorized' })
  }
}
