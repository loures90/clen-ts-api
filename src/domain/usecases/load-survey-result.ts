import { SurveyResultModel } from '../model/survey-result'

export interface LoadSurveyResult {
  load (surveyId: string, accountId: string): Promise<SurveyResultModel>
}
