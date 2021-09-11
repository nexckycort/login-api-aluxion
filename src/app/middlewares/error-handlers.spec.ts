import { NextFunction, Request } from 'express'

import { ERROR_HANDLERS } from '../../infrastructure/entry-points/api/interfaces/error-handler'
import { errorHandlers } from './error-handlers'

const response: any = {
  status(_statusCode: number): any {
    return this
  },
  json(_data: any): any {
    return this
  }
}

const request = {} as Request

const nextFunction = () => ({} as NextFunction)

describe('errorHandlers', () => {
  it('syntax error', (done) => {
    const error = {
      type: ERROR_HANDLERS.SYNTAX_ERROR
    }
    errorHandlers(error, request, response, nextFunction)
    done()
  })

  it('payload too large error', (done) => {
    const error = {
      type: ERROR_HANDLERS.PAYLOAD_TOO_LARGE
    }
    errorHandlers(error, request, response, nextFunction)
    done()
  })

  it('default error', (done) => {
    const error = {
      type: 'default'
    }
    errorHandlers(error, request, response, nextFunction)
    done()
  })

  it('success', (done) => {
    const error = undefined

    errorHandlers(error, request, response, nextFunction)
    done()
  })
})
