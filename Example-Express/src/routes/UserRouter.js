import { Router } from 'express'
const router = new Router()

import validate, { schemas } from '../app/middleware/validate'
import usersController from '../app/controllers/UsersController'

router.route('/')
        .get(usersController.index)
        .post(validate.validateBody(schemas.userSchema), usersController.create)

router.route('/signup')
        .post(validate.validateBody(schemas.authSignUpSchema),usersController.signup)

router.route('/signin')
        .post(validate.validateBody(schemas.authSignInSchema), usersController.signin)

router.route('/secret')
        .get(usersController.secret)

router.route('/:userId')
        .get(validate.validateParam(schemas.idSchema, 'userId'), usersController.getUserById)
        .delete(validate.validateParam(schemas.idSchema, 'userId'), usersController.destroy)
        .put(validate.validateParam(schemas.idSchema, 'userId'), validate.validateBody(schemas.userSchema), usersController.edit)
        .patch(validate.validateParam(schemas.idSchema, 'userId'), validate.validateBody(schemas.userOptional), usersController.update)

router.route('/:userId/decks')
        .get(validate.validateParam(schemas.idSchema, 'userId'), usersController.getUserDecks)
        .post(validate.validateParam(schemas.idSchema, 'userId'), validate.validateBody(schemas.deckSchema), usersController.createUserDecks)


export default router
