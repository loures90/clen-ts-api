import { SurveyModel } from '../model/survey'

export type AddSurveyModel = Omit<SurveyModel, 'id'>

export type AnswerModel = {
  answer: string
  image?: string
}

export interface AddSurvey {
  add (data: AddSurveyModel): Promise<void>
}
