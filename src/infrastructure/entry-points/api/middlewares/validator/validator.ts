import { Validator, ObjectSchema, StringSchema } from 'infrastructure/lib/validator'

import { EmailValidator } from 'infrastructure/interfaces/email-validation'

import { InvalidParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/api-response'
import { HttpRequest, HttpResponse } from '../../interfaces'

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params'
}

export const ValidatorEmail = (emailValidator: EmailValidator): StringSchema =>
  Validator.string().custom((value: string, helpers) => {
    if (emailValidator.isValid(value)) return value
    return helpers.error('any.invalid')
  }, 'Email Validation')

export const JoiAuthBearer = (): StringSchema =>
  Validator.string().custom((value: string, helpers) => {
    if (!value.startsWith('Bearer ')) return helpers.error('any.invalid')
    if (value.split(' ')[1] === '') return helpers.error('any.invalid')
    return value
  }, 'Authorization Header Validation')

export default (schema: ObjectSchema, source: ValidationSource = ValidationSource.BODY) => {
  return {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const { error } = schema.validate(httpRequest[source])

      if (error === undefined) return ok()

      const { details } = error
      const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',')

      return badRequest(new InvalidParamError(message))
    }
  }
}
