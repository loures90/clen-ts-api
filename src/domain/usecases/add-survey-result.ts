import { SurveyResultModel } from '../model/survey-result'

export type AddSurveyResultParams = {
  accountId: string
  surveyId: string
  answer: string
  date: Date
}

export interface AddSurveyResult {
  add (data: AddSurveyResultParams): Promise<SurveyResultModel>
}
