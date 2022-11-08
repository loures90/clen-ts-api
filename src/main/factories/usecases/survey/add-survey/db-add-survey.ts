import { DbAddSurvey } from '../../../../../data/usecases/survey/db-add-survey'
import { SurveyRepository } from '../../../../../infra/db/mongodb/survey'

export const makeDbAddSurvey = (): DbAddSurvey => {
  const surveyRepository = new SurveyRepository()
  return new DbAddSurvey(surveyRepository)
}
