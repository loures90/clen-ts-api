import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/add-survey/add-survey'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export default (router: Router): void => {
  const adminMiddleware = makeAuthMiddleware('admin')
  router.post('/survey', adaptMiddleware(adminMiddleware), adaptRoute(makeAddSurveyController()))
}
