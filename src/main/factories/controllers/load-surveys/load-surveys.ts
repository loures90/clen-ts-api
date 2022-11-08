import { LoadSurveysController } from '../../../../presentation/controllers/load-surveys'
import { Controller } from '../../../../presentation/protocols'
import { makeLogDecorator } from '../../decorators/log-decorators/log'
import { makeDbLoadSurveys } from '../../usecases/survey/load-surveys/db-load-surveys'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogDecorator(loadSurveysController)
}
