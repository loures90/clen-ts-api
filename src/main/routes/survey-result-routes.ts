import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyResultController } from '../factories/controllers/survey-result/add-survey-result/add-survey-result'
import { auth } from '../middlewares/auth-middleware'

export default (router: Router): void => {
  router.put('/surveys/:survey_id/results', auth, adaptRoute(makeAddSurveyResultController()))
}
