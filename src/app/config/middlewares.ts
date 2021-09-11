import { Application } from 'express'

import { bodyParser, bodyUrlEncoded, cors, gzip, helmet } from 'app/middlewares'

export const middlewares = (app: Application): void => {
  app.use(helmet)
  app.use(gzip)
  app.use(cors)
  app.use(bodyParser)
  app.use(bodyUrlEncoded)
}
