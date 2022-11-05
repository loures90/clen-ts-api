export type SurveyResultModel = {
  question: string
  surveyId: string
  answers: SurveyResultAnswersModel[]
  date: Date
}

type SurveyResultAnswersModel = {
  answer: string
  image?: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
