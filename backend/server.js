import express from 'express'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
const port = process.env.port || 5000

connectDB() // connect database
const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
