import { SurveyResultModel } from '../../../../domain/model/survey-result'

export interface LoadSurveyResultRepository {
  loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel>
}
