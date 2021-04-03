import userRoute from './userRoute'
function routes(app) {
  app.use('/auth', userRoute)
}

export default routes
