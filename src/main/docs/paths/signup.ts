export const signupPath = {
  post: {
    tags: ['Login'],
    summary: 'Api de cadastro de usuários',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/signupAccount'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
