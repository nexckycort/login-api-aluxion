import { ValidatorEmail } from 'infrastructure/entry-points/api/middlewares/validator/validator'
import { emailValidator } from 'infrastructure/helpers'
import { Validator } from 'infrastructure/lib/validator'

export const schemaSendMailToRestorePassword = Validator.object().keys({
  email: ValidatorEmail(emailValidator).email().required()
})

export const schemaRestorePassword = Validator.object().keys({
  password: Validator.string().min(6).max(30).required()
})

export const schemaRestorePasswordParams = Validator.object().keys({
  hash: Validator.string().length(60).required()
})
