import { Controller } from '../../../../presentation/protocols'
import { makeAddSurveyValidation } from './add-survey-validation'
import { makeLogDecorator } from '../../decorators/log-decorators/log'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogDecorator(addSurveyController)
}
