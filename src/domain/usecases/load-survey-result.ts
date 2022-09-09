import { SurveyResultModel } from '../model/survey-result'

export interface LoadSurveyResult {
  loadBySurveyId (surveyId: string): Promise<SurveyResultModel>
}
