import jwt from 'jsonwebtoken'

const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = 'admin123'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1d' })
      return res.status(200).json({ token })
    } else {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
