import { SurveyModel } from '../model/survey'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export type AnswerModel = {
  answer: string
  image?: string
}

export interface AddSurvey {
  add (data: AddSurveyParams): Promise<void>
}
