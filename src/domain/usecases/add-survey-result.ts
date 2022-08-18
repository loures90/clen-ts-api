import { SurveyResultModel } from '../model/survey-result'

export type AddSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface AddSurveyResult {
  add (data: AddSurveyResultModel): Promise<SurveyResultModel>
}
