import { SurveyResultModel } from '../../domain/model/survey-result'
import { AddSurveyResultModel } from '../../domain/usecases/add-survey-result'
import { AddSurveyResultRepository } from '../protocols/db/survey-result/add-survey-result-repository'
import { mockSurveyResult } from './mock-survey-result'

export const makeAddSurveyResultRepository = (): AddSurveyResultRepository => {
  class AddSurveyResultRepositoryStub implements AddSurveyResultRepository {
    async add (data: AddSurveyResultModel): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyResult()))
    }
  }
  return new AddSurveyResultRepositoryStub()
}
