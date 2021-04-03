import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 4000

import express from 'express';
import path from 'path'

import db from './src/config/db/index'
import route from './src/routes/route'

class Index {
  constructor() {
    this.server = express();
    this.middlewares();
    this.connect();
    this.routes();
    this.server.listen(PORT,() => console.log(`Server listening at http://localhost:${PORT}`))
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({
      extended: true
    }))
    this.server.use(express.static(path.join(__dirname, 'src', 'public')))
  }

  // connect db
  connect() {
    db.connect()
  }

  routes() {
    route(this.server)
  }
}

export default new Index().server;
