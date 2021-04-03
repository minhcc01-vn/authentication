import dotenv from 'dotenv'
dotenv.config()

import mongoose, {Schema} from 'mongoose'


const mongoURL = process.env.MONGODB_URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

const connect = async () => {
  try {
    await mongoose.connect(mongoURL, options)
    console.log('Connect successfully!')
  } catch (error) {
    console.log('Connect failure!')
  }
}

export default { connect }