import userRoute from './UserRouter'
import deckRoute from './DeckRouter'

function route(app){
  app.use('/deck', deckRoute)
  app.use('/user', userRoute)
  app.use('/', (req, res) => res.send('Home Pages!'))
}

export default route
