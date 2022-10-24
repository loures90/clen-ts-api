import { mockSurveys } from '../../data/test'
import { SurveyModel } from '../../domain/model/survey'
import { LoadSurveys } from '../../domain/usecases/load-surveys'

export class LoadSurveysSpy implements LoadSurveys {
  async load (): Promise<SurveyModel[]> {
    return await new Promise(resolve => resolve(mockSurveys()))
  }
}
