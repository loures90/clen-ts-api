import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/add-survey/add-survey'
import { makeLoadSurveysController } from '../factories/controllers/load-surveys/load-surveys'
import { adminAuth } from '../middlewares/admin-auth-middleware'
import { auth } from '../middlewares/auth-middleware'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
