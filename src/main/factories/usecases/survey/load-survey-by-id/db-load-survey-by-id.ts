import { DbLoadSurveyById } from '../../../../../data/usecases/survey/load-survey-by-id/db-load-survey-by-id'
import { LoadSurveyById } from '../../../../../domain/usecases/load-survey-by-id'
import { SurveyRepository } from '../../../../../infra/db/mongodb/survey-repository/survey'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyRepository = new SurveyRepository()
  return new DbLoadSurveyById(surveyRepository)
}
