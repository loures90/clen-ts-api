import { SurveyResultModel } from '../model/survey-result'

export interface LoadSurveyResult {
  load (surveyId: string): Promise<SurveyResultModel>
}
