import { DbLoadSurveyResult } from '../../../../../data/usecases/survey-result/db-load-survey-result'
import { LoadSurveyResult } from '../../../../../domain/usecases/load-survey-result'
import { SurveyRepository } from '../../../../../infra/db/mongodb/survey'
import { SurveyResultRepository } from '../../../../../infra/db/mongodb/survey-result-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultRepository = new SurveyResultRepository()
  const surveyRepository = new SurveyRepository()
  return new DbLoadSurveyResult(surveyResultRepository, surveyRepository)
}
