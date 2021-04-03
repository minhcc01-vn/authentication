import User from '../models/UserModel'
import bcrypt from 'bcrypt'

class UserController {
  register(req, res, next) {
    const newUser = new User(req.body)
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10)
    newUser.save((err, user) => {
      if(err) {
        return res.status(401).send({
          message: err
        })
      }
      user.hash_password = undefined
      return res.json(user)
    })

    User.create(req.body)
      .then(user => 
        User.updateOne(user, user.hash_password = bcrypt.hashSync(req.body.password, 10))
      )
      .then(user => {
        user.hash_password = undefined
        res.json(user)
      })
      .catch(err => res.status(401).send({
        message: err
      }))

  }

  signIn(req, res, next) {
    User.findOne({email: req.body.email}, (err, user) => {
      if(err) throw err;
      if(!user || !user.comparePassword(req.body.password)) {
        res.status(400).json({
          message: 'Authentication failed. Invalid user or password.' 
        })
      }
      return res.json({token: jwt.sign({email: user.email, fullName: user.fullName, _id: user._id},
        'Authentication')})
    })
  }


  loginRequired(req, res, next) {
    if(req.user) {
      next()
    }else {
      return res.status(401).json({
        message: 'Unauthorized user!!'
      })
    }
  }

  profile(req, res, next) {
    if(req.user) {
      res.send(req.user)
      next()
    }else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

export default new UserController();
