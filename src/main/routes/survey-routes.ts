import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/add-survey/add-survey'
import { makeLoadSurveysController } from '../factories/controllers/load-surveys/load-surveys'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export default (router: Router): void => {
  const adminMiddleware = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())

  router.post('/survey', adminMiddleware, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
