import { Router } from 'express'
const router = new Router()

// import passport from 'passport'
// import '../middleware/PassportMiddleware'

// router.route('/sign_in')
//   .post(authController.sign_in)

// router.route('/sign_up')
//   .post(authController.sign_up)

// router.route('/secret')
//   .post(passport.authenticate('jwt', { session: false }), authController.secret)


import authController from '../app/controller/AuthController'
import freindController from '../app/controller/FreindController'
import * as authMiddleware from '../middleware/AuthMiddleware'

router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
// Sử dụng authMiddleware.isAuth trước những api cần xác thực
// router.use(authController.isAuth);

// List Protect APIs:
router.get("/friends", authMiddleware.isAuth, freindController.friendLists);
// router.get("/example-protect-api", ExampleController.someAction);

export default router
