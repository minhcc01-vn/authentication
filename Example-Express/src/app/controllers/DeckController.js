import UserModel from '../models/UserModel'
import DeckModel from '../models/DeckModel'
class DeckController {
  async index(req, res, next) {
    const deck = await DeckModel.find({})
    res.status(201).json(deck)
  }
  
  create(req, res, next) {
    // get body
    const { owner, ...rest } = req.body
    
    // get user
    UserModel.findById({_id: owner})
      .then(user => {
          user.decks.push(owner)
          user.save()
          return DeckModel.create(Object.assign({}, { owner }, rest))
      })
      .then(deck => res.status(201).json(deck))
      .catch(next)
  }

  async destroy(req, res, next) {
    const { deckId } = req.params
    await DeckModel.findByIdAndDelete(deckId)
    res.status(201).json({success: true})
  }
  
}

export default new DeckController();
