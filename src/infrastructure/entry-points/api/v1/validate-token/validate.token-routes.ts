import { Router } from 'express'

import { makeValidateTokenController } from 'app/factories/validate-token'
import { AdaptRoute } from 'app/adapters/express-route-adapter'

export const validateTokenRoutes = Router()

validateTokenRoutes.get('/', AdaptRoute(makeValidateTokenController()))
