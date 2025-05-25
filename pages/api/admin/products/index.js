// import Product from '@/models/Product'

import Product from "../../../../models/Product"

export default async function handler(req, res) {
  await connectDB()

  if (req.method === 'GET') {
    const products = await Product.find().sort({ createdAt: -1 })
    return res.status(200).json(products)
  }

  if (req.method === 'POST') {
    const { title, price, description, image, category } = req.body
    const product = new Product({ title, price, description, image, category })
    await product.save()
    return res.status(201).json(product)
  }

  res.status(405).json({ message: 'Method not allowed' })
}