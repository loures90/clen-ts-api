export type AddSurveyModel = {
  question: string
  answers: AnswerModel[]
  date: Date
}

export type AnswerModel = {
  answer: string
  image?: string
}

export interface AddSurvey {
  add (data: AddSurveyModel): Promise<void>
}
