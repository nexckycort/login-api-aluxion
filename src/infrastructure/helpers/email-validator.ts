import { EmailValidator } from 'infrastructure/interfaces/email-validation'

export const emailValidator: EmailValidator = {
  isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
