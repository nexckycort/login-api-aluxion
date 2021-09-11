import nodemailer, { SendMailOptions } from 'nodemailer'

import { Logger } from 'infrastructure/helpers'
import { email } from 'app/config/environment'

const transporter = nodemailer.createTransport({
  host: email.host,
  port: email.port,
  auth: {
    user: email.user,
    pass: email.password
  }
} as any)

export const SendEmail = async (Options: SendMailOptions) => {
  const optionsEmail: SendMailOptions = Object.assign(Options, { from: 'api <noreplay@api.com>' })

  return await new Promise<true>((resolve, reject) => {
    transporter.sendMail(optionsEmail, (error, info) => {
      if (error !== null) {
        Logger.error(`Error occurred while sending an email to ${optionsEmail.to as string}`, error.message)
        reject(error)
        return
      }

      Logger.info(`Message sent a ${optionsEmail.to as string} successfully!`)
      resolve(true)
      transporter.close()
    })
  })
}
