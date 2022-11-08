import { DbLoadSurveys } from '../../../../../data/usecases/survey/db-load-surveys'
import { LoadSurveys } from '../../../../../domain/usecases/load-surveys'
import { SurveyRepository } from '../../../../../infra/db/mongodb/survey'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyRepository = new SurveyRepository()
  return new DbLoadSurveys(surveyRepository)
}
