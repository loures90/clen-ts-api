import { SurveyResultModel } from '../../domain/model/survey-result'
import { AddSurveyResultParams } from '../../domain/usecases/add-survey-result'
import { AddSurveyResultRepository } from '../protocols/db/survey-result/add-survey-result-repository'
import { LoadSurveyResultRepository } from '../protocols/db/survey-result/load-survey-result-repository'
import { mockSurveyResult } from './mock-survey-result'

export const mockAddSurveyResultRepository = (): AddSurveyResultRepository => {
  class AddSurveyResultRepositoryStub implements AddSurveyResultRepository {
    async add (data: AddSurveyResultParams): Promise<void> { }
  }
  return new AddSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyResult()))
    }
  }
  return new LoadSurveyResultRepositoryStub()
}
