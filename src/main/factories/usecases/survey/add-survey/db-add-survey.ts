import { DbAddSurvey } from '../../../../../data/usecases/survey/add-survey/db-add-survey'
import { SurveyRepository } from '../../../../../infra/db/mongodb/survey-repository/survey'

export const makeDbAddSurvey = (): DbAddSurvey => {
  const surveyRepository = new SurveyRepository()
  return new DbAddSurvey(surveyRepository)
}
