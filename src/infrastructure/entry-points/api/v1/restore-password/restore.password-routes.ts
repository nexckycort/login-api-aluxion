import { Router } from 'express'

import { AdaptRouteMiddleware } from 'app/adapters/express-middleware-adapter'
import validator, { ValidationSource } from 'infrastructure/entry-points/api/middlewares/validator'
import { schemaRestorePassword, schemaRestorePasswordParams, schemaSendMailToRestorePassword } from 'infrastructure/entry-points/api/v1/restore-password'
import { AdaptRoute } from 'app/adapters/express-route-adapter'
import { makeRestorePasswordController, makeSendMailToRestorePasswordController } from 'app/factories/restore-password'

export const restorePasswordRoutes = Router()

restorePasswordRoutes.post('/', ...AdaptRouteMiddleware(validator(schemaSendMailToRestorePassword)), AdaptRoute(makeSendMailToRestorePasswordController()))

restorePasswordRoutes.post('/:hash', ...AdaptRouteMiddleware(validator(schemaRestorePassword), validator(schemaRestorePasswordParams, ValidationSource.PARAM)), AdaptRoute(makeRestorePasswordController()))
