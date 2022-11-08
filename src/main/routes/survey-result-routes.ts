import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyResultController } from '../factories/controllers/add-survey-result/add-survey-result'
import { makeLoadSurveyResultController } from '../factories/controllers/load-survey-result/load-survey-result'
import { auth } from '../middlewares/auth-middleware'

export default (router: Router): void => {
  router.put('/surveys/:survey_id/results', auth, adaptRoute(makeAddSurveyResultController()))
  router.get('/surveys/:survey_id/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
