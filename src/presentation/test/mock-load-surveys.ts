import { mockSurveys } from '../../data/test'
import { SurveyModel } from '../../domain/model/survey'
import { LoadSurveys } from '../../domain/usecases/load-surveys'

export class LoadSurveysSpy implements LoadSurveys {
  account_id: string
  async load (accountId: string): Promise<SurveyModel[]> {
    this.account_id = accountId
    return await new Promise(resolve => resolve(mockSurveys()))
  }
}
