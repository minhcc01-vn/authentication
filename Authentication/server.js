import express from 'express'
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

import db from './src/config/db/index'
import routes from './src/route/routes'

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
// connect db
db.connect()

// init route
routes(app)
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
