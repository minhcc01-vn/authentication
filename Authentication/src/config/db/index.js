import mongoose from 'mongoose'
require('dotenv').config()

const option = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}
const mongoURL = process.env.URL_MONGODB
const connect = async() =>{
  try { 
    await mongoose.connect(mongoURL, option)
    console.log("Connected successfully! ");
  } catch (error) {
    console.log("Connect failure!");
  }
}

export default { connect }
