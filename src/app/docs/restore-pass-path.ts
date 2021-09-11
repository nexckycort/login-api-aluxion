export const restorePassPath = {
  post: {
    tags: ['Restore password'],
    summary: 'API to restore password',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/restorePassParams'
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
              $ref: '#/schemas/restorePass'
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
