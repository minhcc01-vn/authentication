require('dotenv').config()
import express, { urlencoded } from 'express'

import path from 'path'


const app = express()
const PORT = process.env.PORT || 4000

import db from './src/config/db/index'
import route from './src/routes/index'

// middleware
app.use(express.static(path.join(__dirname, 'src', 'public')))
app.use(express.urlencoded(
  {
    extended: true
  }
))
app.use(express.json())

// connect db
db.connect()

// init route
route(app)

app.listen(PORT, () => console.log(`App listenning at http://localhost:${PORT}`))