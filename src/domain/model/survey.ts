import { AnswerModel } from '../usecases/add-survey'

export interface SurveyModel {
  id: string
  question: string
  answers: AnswerModel[]
  date: Date
}
