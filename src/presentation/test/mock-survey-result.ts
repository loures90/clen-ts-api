import { SurveyResultModel } from '../../domain/model/survey-result'
import { AddSurveyResult, AddSurveyResultParams } from '../../domain/usecases/add-survey-result'
import { LoadSurveyResult } from '../../domain/usecases/load-survey-result'

export const mockAddSurveyResult = (): AddSurveyResult => {
  class AddSurveyResultStub implements AddSurveyResult {
    async add (data: AddSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyResult()))
    }
  }
  return new AddSurveyResultStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyResult()))
    }
  }
  return new LoadSurveyResultStub()
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
