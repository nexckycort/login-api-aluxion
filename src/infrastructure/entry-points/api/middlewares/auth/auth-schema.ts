import { JoiAuthBearer } from 'infrastructure/entry-points/api/middlewares/validator/validator'
import { Validator } from 'infrastructure/lib/validator'

export const schemaAuth = Validator.object()
  .keys({
    authorization: JoiAuthBearer().required()
  })
  .unknown(true)
