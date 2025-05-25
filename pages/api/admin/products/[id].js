import Product from "../../../../models/Product"

export default async function handler(req, res) {
  await connectDB()
  const { id } = req.query

  if (req.method === 'PUT') {
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json(updated)
  }

  if (req.method === 'DELETE') {
    await Product.findByIdAndDelete(id)
    return res.status(204).end()
  }

  res.status(405).json({ message: 'Method not allowed' })
}