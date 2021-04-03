import autherRoute from './AuthRoute'

function route(app) {
  app.use('/auth', autherRoute)  
}
export default route
