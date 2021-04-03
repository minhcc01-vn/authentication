import Auth from '../app/models/AuthModel'
require('dotenv').config()

import passport from 'passport'
import passportJwt from 'passport-jwt'
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_SECRET

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Auth.findById({ _id: jwt_payload.sub })
      .then(auth =>{
        if(auth) { 
          return done(null, auth) 
        }
        return done(null, false)
      })
      .catch(error => done(error, false))
}))
