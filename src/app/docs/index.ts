import { api } from 'app/config/environment'
import { serverError, badRequest } from './components'
import { signupParamsSchema } from './schemas/signup/signup-params-schema'
import { signupSchema } from './schemas/signup/signup-schema'
import { errorSchema } from './schemas/error/error-schema'
import { signupPath } from './signup-path'
import { loginSchema } from './schemas/login/login-schema'
import { loginPath } from './login-path'
import { loginParamsSchema } from './schemas/login/login-params-schema'
import { sendEmailRestorePassPath } from './send-mail-restore-pass-path'
import { sendEmailRestorePassSchema } from './schemas/send-email-restore-pass/send-email-restore-pass-schema'
import { sendEmailRestorePassParamsSchema } from './schemas/send-email-restore-pass/send-email-restore-pass-params-schema'
import { restorePassPath } from './restore-pass-path'
import { restorePassParamsSchema } from './schemas/restore-pass/restore-pass-params-schema'
import { restorePassSchema } from './schemas/restore-pass/restore-pass-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Login aluxion',
    description: 'API - Nestor Cortina',
    version: '1.0'
  },
  servers: [{ url: api.prefixV1 }],
  tags: [{ name: 'Login' }],
  paths: {
    '/signup': signupPath, // route
    '/login': loginPath, // route
    '/restore-password': sendEmailRestorePassPath, // route
    '/restore-password/:hash': restorePassPath // route
  },
  schemas: {
    signup: signupSchema, // response
    signupParams: signupParamsSchema, // request

    login: loginSchema, // response
    loginParams: loginParamsSchema, // request

    sendEmailRestorePass: sendEmailRestorePassSchema, // response
    sendEmailRestorePassParams: sendEmailRestorePassParamsSchema, // request

    restorePass: restorePassSchema, // response
    restorePassParams: restorePassParamsSchema, // request

    error: errorSchema
  },
  components: {
    badRequest,
    serverError
  }
}
