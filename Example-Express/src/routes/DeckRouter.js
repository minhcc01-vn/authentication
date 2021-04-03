import { Router } from 'express'
const router = new Router()

import deckController from '../app/controllers/DeckController'

router.route('/')
  .get(deckController.index)
  .post(deckController.create)

router.route('/:deckId')
  .delete(deckController.destroy)

export default router
