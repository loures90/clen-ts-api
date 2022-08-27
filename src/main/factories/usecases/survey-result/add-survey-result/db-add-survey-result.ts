import { DBAddSurveyResult } from '../../../../../data/usecases/survey-result/add-survey-result/db-add-survey-result'
import { AddSurveyResult } from '../../../../../domain/usecases/add-survey-result'
import { SurveyResultRepository } from '../../../../../infra/db/mongodb/survey-result-repository/survey-result-repository'

export const makeDbAddSurveyResult = (): AddSurveyResult => {
  const surveyResultRepository = new SurveyResultRepository()
  return new DBAddSurveyResult(surveyResultRepository)
}
