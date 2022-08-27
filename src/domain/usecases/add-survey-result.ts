import { SurveyResultModel } from '../model/survey-result'

export type AddSurveyResultParams = Omit<SurveyResultModel, 'id'>

export interface AddSurveyResult {
  add (data: AddSurveyResultParams): Promise<SurveyResultModel>
}
