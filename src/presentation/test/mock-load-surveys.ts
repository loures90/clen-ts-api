import { mockSurveys } from '../../data/test'
import { SurveyModel } from '../../domain/model/survey'
import { LoadSurveys } from '../../domain/usecases/load-surveys'

export const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(mockSurveys()))
    }
  }
  return new LoadSurveysStub()
}
