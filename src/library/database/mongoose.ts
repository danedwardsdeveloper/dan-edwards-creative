import mongoose from 'mongoose'

import logger from '@/library/logger'

mongoose.set('strictQuery', true)

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI missing')
    }

    await mongoose.connect(process.env.MONGODB_URI)
    logger.info('MongoDB connected via Mongoose')
  } catch (error) {
    logger.info('MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDB
