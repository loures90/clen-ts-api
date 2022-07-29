export interface AddSurveyModel {
  question: string
  answers: AnswerModel[]
}

export interface AnswerModel {
  answer: string
  image: string
}

export interface AddSurvey {
  add (data: AddSurveyModel): Promise<void>
}
