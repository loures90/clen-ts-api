import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/add-survey/add-survey'

export default (router: Router): void => {
  router.post('/survey', adaptRoute(makeAddSurveyController()))
}
