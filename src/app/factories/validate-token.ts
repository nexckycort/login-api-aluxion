import { ValidateTokenController } from 'infrastructure/entry-points/api/v1/validate-token'

export const makeValidateTokenController = (): ValidateTokenController => {
  const validateTokenController = new ValidateTokenController()
  return validateTokenController
}
