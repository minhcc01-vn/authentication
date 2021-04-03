import { Router } from 'express'
const router = new Router()

import userHandles from '../controllers/UserController'

router.route('/tasks')
  .post(userHandles.loginRequired, userHandles.profile)
router.route('/register')
  .post(userHandles.register)

router.route('/signin')
  .post(userHandles.signIn)

export default router
