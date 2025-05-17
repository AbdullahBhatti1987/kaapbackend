import Product from '../models/Product.js'

export const createProduct = async (req, res) => {
  const { name, description, price, stock, image, category } = req.body

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    image,
    category
  })

  res.status(201).json(product)
}

export const getAllProducts = async (req, res) => {
  const products = await Product.find().populate('category', 'name')
  res.json(products)
}

export const getProductByCategory = async (req, res) => {
  const products = await Product.find({ category: req.params.categoryId }).populate('category', 'name')
  res.json(products)
}

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name')
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}
