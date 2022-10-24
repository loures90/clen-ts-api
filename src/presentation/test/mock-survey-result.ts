import { SurveyResultModel } from '../../domain/model/survey-result'
import { AddSurveyResult, AddSurveyResultParams } from '../../domain/usecases/add-survey-result'
import { LoadSurveyResult } from '../../domain/usecases/load-survey-result'

export class AddSurveyResultSpy implements AddSurveyResult {
  data: AddSurveyResultParams
  async add (data: AddSurveyResultParams): Promise<SurveyResultModel> {
    this.data = data
    return await new Promise(resolve => resolve(mockSurveyResult()))
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  async load (surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
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
    percent: 50
  }, {
    answer: 'other_answer',
    image: 'other_image',
    count: 1,
    percent: 50
  }
  ],
  date: new Date()
})
