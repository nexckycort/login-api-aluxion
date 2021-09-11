import { HttpRequest, HttpResponse, MiddlewareController, UnauthorizedInvalidTokenError, ok, serverError, unauthorized } from './auth-protocols'
import { ISessionService } from 'domain/services/interfaces/session'
import { Logger } from 'infrastructure/helpers/logger'

export class AuthMiddleware implements MiddlewareController {
  constructor(private readonly sessionService: ISessionService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { authorization } = httpRequest.headers
      const [, token] = authorization.split(' ')

      const sessionAlReadyExist = await this.sessionService.validate(token)
      if (sessionAlReadyExist === undefined) return unauthorized(new UnauthorizedInvalidTokenError())

      httpRequest.body.session = sessionAlReadyExist
      return ok()
    } catch (error) {
      Logger.error('AuthMiddleware', error)
      return serverError(error)
    }
  }
}
