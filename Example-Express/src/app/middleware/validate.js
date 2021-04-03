import Joi, { required } from 'joi'

class validate {
  validateBody(schema) {
    return(req, res, next) => {
      const validatorResult = schema.validate(req.body)
      if (validatorResult.error) {
        res.json(validatorResult.error)      
      }
      if(!req.value) req.value = {}
      if(!req.value['body']) req.value.body = {}
  
      req.value.body = validatorResult.value
      next()
    }
  }
  
  validateParam(schema, name) {
    return(req, res, next) => {
      const validatorResult = schema.validate({param: req.params[name]})
      if (validatorResult.error) {
        return res.json(validatorResult.error)
      }
      if(!req.value) req.value = {}
      if(!req.value['params']) req.value.params = {}
  
      req.value.params[name] = req.params[name]
      next()     
    }
  }
}

const schemas = {
  deckSchema: Joi.object().keys({
    title: Joi.string().min(6).required(),
    description: Joi.string(),
    owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  }),
  authSignInSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  authSignUpSchema: Joi.object().keys({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  deckSchema: Joi.object().keys({
    title: Joi.string().min(6).required()
  }),

  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
  }),

  userSchema: Joi.object().keys({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
  }),

  userOptional: Joi.object().keys({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string().email(),
  }),
}

export default new validate()

export {
  schemas
}