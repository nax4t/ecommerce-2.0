import mongoose from 'mongoose'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MONGODB CONNECTED: ${conn.connection.host}`)
  } catch (error) {
    console.log(`ERROR: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
