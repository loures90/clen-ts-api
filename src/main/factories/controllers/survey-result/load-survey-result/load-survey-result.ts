import { Controller } from '../../../../../presentation/protocols'
import { LoadSurveyResultController } from '../../../../../presentation/controllers/survey-result/load-survey-result/load-survey-result'
import { makeDbLoadSurveyById } from '../../../usecases/survey/load-survey-by-id/db-load-survey-by-id'
import { makeDbLoadSurveyResult } from '../../../usecases/survey-result/load-survey-result/db-load-survey-result'

export const makeLoadSurveyResultController = (): Controller => {
  return new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
}
