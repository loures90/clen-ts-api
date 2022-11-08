import { SurveyResultModel } from '../../src/domain/model/survey-result'
import { AddSurveyResultParams } from '../../src/domain/usecases/add-survey-result'
import { AddSurveyResultRepository } from '../../src/data/protocols/db/survey-result/add-survey-result-repository'
import { LoadSurveyResultRepository } from '../../src/data/protocols/db/survey-result/load-survey-result-repository'
import { mockSurveyResult } from './index'

export class AddSurveyResultRepositorySpy implements AddSurveyResultRepository {
  data: AddSurveyResultParams
  async add (data: AddSurveyResultParams): Promise<void> {
    this.data = data
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyId: string
  accountId: string
  async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.accountId = accountId
    this.surveyId = surveyId
    return await new Promise(resolve => resolve(mockSurveyResult()))
  }
}
