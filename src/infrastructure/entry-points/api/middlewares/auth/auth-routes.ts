import { Router } from 'express'

import validator, { ValidationSource } from 'infrastructure/entry-points/api/middlewares/validator'
import { AdaptRouteMiddleware } from 'app/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from 'app/factories/auth'
import { schemaAuth } from 'infrastructure/entry-points/api/middlewares/auth'

export const authMiddleware = Router()

authMiddleware.use('/', ...AdaptRouteMiddleware(validator(schemaAuth, ValidationSource.HEADER), makeAuthMiddleware()))
