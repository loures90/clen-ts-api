import { Controller } from '../../../../presentation/protocols'
import { makeAddSurveyValidation } from './add-survey-validation'
import { makeLogDecorator } from '../../decorators/log-decorators/log'
import { AddSurveyController } from '../../../../presentation/controllers'
import { makeDbAddSurvey } from '../../usecases/survey/add-survey/db-add-survey'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogDecorator(addSurveyController)
}
