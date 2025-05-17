import Category from '../models/Category.js'
export const createCategory = async (req, res) => {
  const { name, image } = req.body

  const categoryExists = await Category.findOne({ name })
  if (categoryExists) {
    return res.status(400).json({ message: 'Category already exists' })
  }

  const category = await Category.create({ name, image })
  res.status(201).json(category)
}

export const getAllCategories = async (req, res) => {
  const categories = await Category.find()
  res.json(categories)
}

export const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    return res.status(404).json({ message: 'Category not found' })
  }

  await category.deleteOne()
  res.json({ message: 'Category deleted' })
}
