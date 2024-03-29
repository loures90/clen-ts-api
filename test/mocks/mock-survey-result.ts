import { SurveyResultModel } from '../../src/domain/model/survey-result'
import { AddSurveyResult, AddSurveyResultParams } from '../../src/domain/usecases/add-survey-result'
import { LoadSurveyResult } from '../../src/domain/usecases/load-survey-result'
import { faker } from '@faker-js/faker'

export class AddSurveyResultSpy implements AddSurveyResult {
  data: AddSurveyResultParams
  async add (data: AddSurveyResultParams): Promise<SurveyResultModel> {
    this.data = data
    return await new Promise(resolve => resolve(mockSurveyResult()))
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  accountId: string
  async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    this.accountId = accountId
    return await new Promise(resolve => resolve(mockSurveyResult()))
  }
}

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

export const mockAddSurveyResultParams = (): AddSurveyResultParams => ({
  accountId: faker.datatype.uuid(),
  surveyId: faker.datatype.uuid(),
  answer: faker.datatype.string(),
  date: new Date()
})