import { Ok, defaultAnswerOk } from '../interfaces/api-response'
import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../interfaces/http'

export const ok = ({ message = 'Ok', statusCode = '2000', data }: Ok = defaultAnswerOk): HttpResponse => ({
  statusCode: 200,
  body: {
    message,
    statusCode,
    data
  }
})

export const badRequest = (error: any): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (error: any): HttpResponse => ({
  statusCode: 401,
  body: error
})

export const forbidden = (error: any): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const serverError = (error: any): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack as string)
})
