import mongoose from 'mongoose'

const mongoDB = "mongodb://localhost/example-express"

const connect = async() => {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true      
    })
    console.log("Mongodb is connect successfully!")
  } catch (error) {
    console.log("Mongodb connection failed!");
  }
}

export default { connect }