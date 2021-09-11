export class DefaultError extends Error {
  private readonly statusCode: string
  constructor(message: string) {
    super()
    this.statusCode = '4000'
    this.message = message
  }
}
