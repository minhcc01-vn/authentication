import UserModel from '../models/UserModel'
import DeckModel from '../models/DeckModel'

import jwt from 'jsonwebtoken'
import { encodedToken } from '../token/token'

class UsersController {
  // [GET] /
  async index(req, res) {
    const user = await UserModel.find({})
    res.json(user)
  }

  // [POST ] /
  create(req, res, next) {
    const newUser = req.value.body
    UserModel.create(newUser)
      .then(user => res.json(user))
      .catch(next)
  }

  // [ GET ] /:userId
  async getUserById(req, res, next) {
    const user = await UserModel.findById(req.value.params.userId)
    res.json(user)
  }
  // [ DELETE ] /:userId
  async destroy(req, res, next) {
    await UserModel.deleteOne({_id: req.value.params.userId})
    res.json({success: true})
  }

  // [ PUT ] /:userId
  async edit(req, res, next) {
    await UserModel.replaceOne({_id: req.value.params.userId}, req.value.body)
    res.json(req.value.body)
  }

  // [ PATCH ] /:userId
  async update(req, res, next) {
    await UserModel.updateOne({_id: req.value.params.userId}, req.value.body)
    res.json(req.value.body)
  }

  // [ GET ] /:userId/decks
  getUserDecks(req, res, next) {
    const { userId } = req.value.params
    UserModel.findById(userId).populate('decks')
      .then(user => res.json(user.decks))
      .catch(next)
  }

  // [ POST ] /:userId/decks
  async createUserDecks(req, res, next) {
    const { userId } = req.value.params
    const newDeck = new DeckModel(req.value.body)

    // get user
    const user = await UserModel.findById(userId)

    // add user for newDeck
    newDeck.owner = user._id

    // save newDeck
    await newDeck.save()

    // add newDeck for user
    user.decks.push(newDeck._id)
    user.save()

    res.json({deck: newDeck})

  }

  // [ POST ] /signin
  async signin(req, res, next) {
    const account = req.body
    console.log(account);
  }

  // [ POST ] /signup
  async signup(req, res, next) {
    const account = await req.body
    const foundUser = await UserModel.findOne({email: account.email})
    if(foundUser) {
      return res.json("email is already exists!")
    }
    const newUser = new UserModel(account)
    newUser.save()
    const token = encodedToken(newUser._id)
    res.setHeader('Authentication', token)
    res.status(201).json({succes: true})

  }
  // [ GET ] /secret
  async secret(req, res, next) {
    console.log('Called to secret function');
  }
}

export default new UsersController();
