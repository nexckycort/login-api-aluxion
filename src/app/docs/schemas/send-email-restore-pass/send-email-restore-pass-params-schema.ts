export const sendEmailRestorePassParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    }
  },
  required: ['email']
}

// request
