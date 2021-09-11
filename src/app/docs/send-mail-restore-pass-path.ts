export const sendEmailRestorePassPath = {
  post: {
    tags: ['Send email restore password'],
    summary: 'API to send email restore password',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/sendEmailRestorePassParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/sendEmailRestorePass'
            }
          }
        }
      },
      404: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
