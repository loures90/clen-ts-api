import { mockSurveyResult } from '../../data/test'
import { SurveyResultModel } from '../../domain/model/survey-result'
import { AddSurveyResult, AddSurveyResultParams } from '../../domain/usecases/add-survey-result'

export const mockAddSurveyResult = (): AddSurveyResult => {
  class AddSurveyResultStub implements AddSurveyResult {
    async add (data: AddSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyResult()))
    }
  }
  return new AddSurveyResultStub()
}
