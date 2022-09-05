import { loginPath, surveyPath, signupPath, surveyResultPath } from './paths'

export default {
  '/signup': signupPath,
  '/login': loginPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath
}
