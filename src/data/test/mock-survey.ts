import { SurveyModel } from '../../domain/model/survey'

export const mockSurvey = (): SurveyModel => (
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_answer',
      answer: 'any_answer'
    }],
    date: new Date()
  }
)

export const mockSurveys = (): SurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_answer',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_answer',
      answer: 'other_answer'
    }],
    date: new Date()
  }
])
