import { RijndaelAdapter } from 'infrastructure/adapters/rijndael-adapter'
import { UserRepository } from 'infrastructure/repositories/user-repository'
import { rijndaelKey } from 'app/config/environment'
import { UserService } from 'domain/services/user-service'
import { RestorePasswordController, SendMailToRestorePasswordController } from 'infrastructure/entry-points/api/v1/restore-password'
import { RestorePasswordService } from 'domain/services/restore.password-service'

export const makeSendMailToRestorePasswordController = (): SendMailToRestorePasswordController => {
  const rijndaelAdapter = new RijndaelAdapter(10, rijndaelKey)
  const userRepository = new UserRepository()
  const userService = new UserService(rijndaelAdapter, userRepository)
  const restorePasswordService = new RestorePasswordService(userService, rijndaelAdapter)
  const sendMailToRestorePasswordController = new SendMailToRestorePasswordController(restorePasswordService, userService)
  return sendMailToRestorePasswordController
}

export const makeRestorePasswordController = (): RestorePasswordController => {
  const rijndaelAdapter = new RijndaelAdapter(10, rijndaelKey)
  const userRepository = new UserRepository()
  const userService = new UserService(rijndaelAdapter, userRepository)
  const restorePasswordService = new RestorePasswordService(userService, rijndaelAdapter)
  const restorePasswordController = new RestorePasswordController(restorePasswordService)
  return restorePasswordController
}
