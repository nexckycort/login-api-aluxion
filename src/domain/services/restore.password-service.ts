import crypto from 'crypto'

import { RijndaelAdapter } from 'domain/interfaces/rijndael'
import { SendEmail } from 'infrastructure/handlers/email'
import { Logger } from 'infrastructure/helpers'
import { restorePasswordHtml, restorePasswordText } from 'infrastructure/helpers/templates/emails/restorePassword'
import { mailExpirationTime } from 'app/config/environment'
import { IRestorePasswordService } from './interfaces/restore-password'
import { IUserService } from './interfaces/user'

export class RestorePasswordService implements IRestorePasswordService {
  constructor(private readonly userService: IUserService, private readonly rijndaelAdapter: RijndaelAdapter, private readonly sendEmail = SendEmail) {}

  sendMailToRestorePassword = async (email: string) => {
    try {
      const hash = crypto.randomBytes(30).toString('hex')
      const msgHash = 'hash generated to restore password'
      Logger.info(`${msgHash}: ${hash}`)

      const currentDate = new Date()
      currentDate.setHours(currentDate.getHours() + mailExpirationTime)
      const data = {
        token: hash,
        expira_token: currentDate
      }
      await this.userService.update({ email }, data)
      const url = ['https://example-url.com', 'restore-password', hash].join('/')
      const optionsEmail = {
        to: email,
        subject: 'Reset password',
        text: restorePasswordText(url),
        html: restorePasswordHtml(url)
      }

      return await this.sendEmail(optionsEmail)
    } catch (error) {
      Logger.error('RestorePasswordService sendMailToRestorePassword', error)
      throw error
    }
  }

  private readonly validateHashRestorePassword = async (hash: string): Promise<boolean> => {
    try {
      const currentDate = new Date()
      const expired = new Date()
      expired.setMinutes(currentDate.getMinutes() + mailExpirationTime)

      const userRecord = await this.userService.findOne({ token: hash })
      if (userRecord === null) return false
      return userRecord.expira_token > currentDate
    } catch (error) {
      Logger.error('RestorePasswordService validateHashRestorePassword', error)
      throw error
    }
  }

  restorePassword = async (hash: string, password: string) => {
    const isValidHash = await this.validateHashRestorePassword(hash)
    if (!isValidHash) return false
    const newPassword = await this.rijndaelAdapter.encrypt(password)
    const { _id } = await this.userService.update(
      { token: hash },
      {
        password: newPassword,
        salt: this.rijndaelAdapter.saltText
      }
    )

    await this.userService.update(
      { _id },
      {
        token: null,
        expira_token: null
      }
    )
    return true
  }
}
