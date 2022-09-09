import { SurveyResultModel } from '../../../../domain/model/survey-result'

export interface LoadSurveyResultRepository {
  loadBySurveyId (surveyId: string): Promise<SurveyResultModel>
}
