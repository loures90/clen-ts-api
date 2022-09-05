import { loginPath, surveyPath, signupPath } from './paths'
import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveyAnswerSchema,
  surveySchema, surveysSchema,
  apiKeyAuthSchema,
  signupParamsSchema,
  signupAccountSchema,
  addSurveyParams
} from './schemas'
import { badRequest, serverError, unauthorized, notFound, forbidden } from './components'

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
  },
  {
    name: 'Enquete'
  }],
  paths: {
    '/signup': signupPath,
    '/login': loginPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    signupAccount: signupAccountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    error: errorSchema,
    surveyAnswer: surveyAnswerSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    addSurveyParams
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
