import { loginPath } from './paths'
import { accountSchema, loginParamsSchema, errorSchema } from './schemas'
import { badRequest, serverError, unauthorized, notFound } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Api de Enquetes para programadores',
    description: 'Curso Manguinho',
    version: '1.0.0'
  },
  license: {
    name: '',
    url: ''
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
