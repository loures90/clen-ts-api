import { AnswerModel } from '../usecases/add-survey'

export type SurveyModel = {
  id: string
  question: string
  answers: AnswerModel[]
  date: Date
  didAnswer?: boolean
}
