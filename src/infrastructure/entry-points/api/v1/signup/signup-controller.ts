import { badRequest, ok, serverError } from 'infrastructure/entry-points/api/helpers/api-response'
import { HttpRequest, HttpResponse, Controller } from './signup-protocols'
import { AlReadyExist } from '../../errors'
import { Logger } from 'infrastructure/helpers/logger'
import { IUserService } from 'domain/services/interfaces/user'

export class SignupController implements Controller {
  constructor(private readonly userService: IUserService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body

      const userAlReadyExist = await this.userService.findByEmail(email)

      if (userAlReadyExist !== null) {
        return badRequest(new AlReadyExist(email))
      }

      await this.userService.create({ name, email, password })
      return ok({ message: 'Successful registration' })
    } catch (error) {
      Logger.error('SignupController', error)
      return serverError(error)
    }
  }
}
