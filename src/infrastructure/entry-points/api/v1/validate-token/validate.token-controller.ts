import { ok, serverError } from 'infrastructure/entry-points/api/helpers/api-response'
import { HttpRequest, HttpResponse, Controller } from './validate.token-protocols'
import { Logger } from 'infrastructure/helpers/logger'

export class ValidateTokenController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const session = httpRequest.body.session
      return ok({ data: session, message: 'valid token' })
    } catch (error) {
      Logger.error('ValidateTokenController', error)
      return serverError(error)
    }
  }
}
