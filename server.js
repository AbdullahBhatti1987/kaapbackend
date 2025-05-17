// import express from 'express'
// import dotenv from 'dotenv'
// import mongoose from 'mongoose'
// import cors from 'cors'
// import connectDB from './config/db.js'

// dotenv.config()
// connectDB()

// const app = express()

// app.use(cors())
// app.use(express.json())
// const port = process.env.PORT || 5000
// const mongoURI = process.env.MONGO_URI

// app.get('/', (req, res) => {
//   res.send('API is running...')
// })

// import authRoutes from './routes/authRoutes.js'
// app.use('/api/auth', authRoutes);

// import categoryRoutes from './routes/categoryRoutes.js'
// app.use('/api/categories', categoryRoutes);


// import productRoutes from './routes/productRoutes.js';
// app.use('/api/products', productRoutes)


// import cartRoutes from './routes/cartRoutes.js'
// app.use('/api/cart', cartRoutes)

// import orderRoutes from './routes/orderRoutes.js'
// app.use('/api/orders', orderRoutes)



// const PORT = process.env.PORT || 5000


// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


// await mongoose.connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('MongoDB connected')
//     app.listen(5000, () => console.log('Server running on port 5000'))
//   })
//   .catch(err => console.error(err))


import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

dotenv.config()


const app = express()
app.use(express.json())

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }))

// app.use(cors({
//   origin: '*', // ✅ for development only
// }))

app.use(cors())


app.get('/', (req, res) => {
  res.send('API is running...')
})

import authRoutes from './routes/authRoutes.js'
app.use('/api/auth', authRoutes)

import categoryRoutes from './routes/categoryRoutes.js'
app.use('/api/categories', categoryRoutes)

import productRoutes from './routes/productRoutes.js'
app.use('/api/products', productRoutes)

import cartRoutes from './routes/cartRoutes.js'
app.use('/api/cart', cartRoutes)

import orderRoutes from './routes/orderRoutes.js'
app.use('/api/orders', orderRoutes)

connectDB()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
