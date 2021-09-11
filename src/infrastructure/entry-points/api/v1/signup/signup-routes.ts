import { Router } from 'express'

import { AdaptRoute } from 'app/adapters/express-route-adapter'
import { makeSignupController } from 'app/factories/signup'
import validator from 'infrastructure/entry-points/api/middlewares/validator'
import { schemaSignup } from 'infrastructure/entry-points/api/v1/signup'
import { AdaptRouteMiddleware } from 'app/adapters/express-middleware-adapter'

export const signupRoutes = Router()

signupRoutes.post('/', ...AdaptRouteMiddleware(validator(schemaSignup)), AdaptRoute(makeSignupController()))
