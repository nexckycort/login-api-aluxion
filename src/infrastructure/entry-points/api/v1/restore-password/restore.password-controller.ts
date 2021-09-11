import { badRequest, ok, serverError } from 'infrastructure/entry-points/api/helpers/api-response'
import { HttpRequest, HttpResponse, Controller, IRestorePasswordService, IUserService } from './restore.password-protocols'
import { Logger } from 'infrastructure/helpers/logger'
import { DefaultError, NoAlReadyExist } from '../../errors'

export class SendMailToRestorePasswordController implements Controller {
  constructor(private readonly restorePasswordService: IRestorePasswordService, private readonly userService: IUserService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.body

      const userAlReadyExist = await this.userService.findByEmail(email)
      if (userAlReadyExist === null) return badRequest(new NoAlReadyExist('email'))

      const result = await this.restorePasswordService.sendMailToRestorePassword(email)
      if (!result) return badRequest(new DefaultError('could not send mail, try again later'))
      return ok({ message: 'A message was sent to your email' })
    } catch (error) {
      Logger.error('RestorePasswordController', error)
      return serverError(error)
    }
  }
}

export class RestorePasswordController implements Controller {
  constructor(private readonly restorePasswordService: IRestorePasswordService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { hash } = httpRequest.params
      const { password } = httpRequest.body
      const result = await this.restorePasswordService.restorePassword(hash, password)
      if (!result) return badRequest(new DefaultError('invalid hash'))
      return ok({ message: 'your password was updated correctly' })
    } catch (error) {
      Logger.error('RestorePasswordController', error)
      return serverError(error)
    }
  }
}
