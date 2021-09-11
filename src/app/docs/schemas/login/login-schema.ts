export const loginSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string'
    },
    statusCode: {
      type: 'string'
    },
    data: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            }
          }
        },
        token: {
          type: 'string'
        }
      }
    }
  }
}

// response
