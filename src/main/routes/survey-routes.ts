import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys'
import { adminAuth } from '../middlewares/admin-auth-middleware'
import { auth } from '../middlewares/auth-middleware'

export default (router: Router): void => {
  router.post('/survey', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
