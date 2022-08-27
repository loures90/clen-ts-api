import { mockSurvey } from '../../data/test'
import { SurveyModel } from '../../domain/model/survey'
import { LoadSurveyById } from '../../domain/usecases/load-survey-by-id'

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => resolve(mockSurvey()))
    }
  }
  return new LoadSurveyByIdStub()
}
