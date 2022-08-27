import { AddSurveyResultController } from '../../../../../presentation/controllers/survey-result/add-survey-result/add-survey-result'
import { Controller } from '../../../../../presentation/protocols'
import { makeDbAddSurveyResult } from '../../../usecases/survey-result/add-survey-result/db-add-survey-result'
import { makeDbLoadSurveyById } from '../../../usecases/survey/load-survey-by-id/db-load-survey-by-id'

export const makeAddSurveyResultController = (): Controller => {
  return new AddSurveyResultController(makeDbLoadSurveyById(), makeDbAddSurveyResult())
}
