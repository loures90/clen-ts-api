import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveyAnswerSchema,
  surveySchema, surveysSchema,
  apiKeyAuthSchema,
  signupParamsSchema,
  signupAccountSchema,
  addSurveyParams,
  saveSurveyResultParams,
  surveyResultParamsSchema
} from './schemas'

export default {
  account: accountSchema,
  signupAccount: signupAccountSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  error: errorSchema,
  surveyAnswer: surveyAnswerSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  addSurveyParams,
  saveSurveyResultParams,
  surveyResult: surveyResultParamsSchema,
  apiKeyAuthSchema
}
