export const signupParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    }
  },
  required: ['name', 'email', 'password', 'passwordConfirmation']
}
