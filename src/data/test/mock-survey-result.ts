import { SurveyResultModel } from '../../domain/model/survey-result'
import { AddSurveyResultParams } from '../../domain/usecases/add-survey-result'

export const mockAddSurveyResult = (): AddSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResult = (): SurveyResultModel => ({
  question: 'any_question',
  surveyId: 'any_id',
  answers: [{
    answer: 'any_answer',
    image: 'any_image',
    count: 1,
    percent: 50,
    isCurrentAccountAnswer: false
  }, {
    answer: 'other_answer',
    image: 'other_image',
    count: 1,
    percent: 50,
    isCurrentAccountAnswer: true
  }
  ],
  date: new Date()
})
