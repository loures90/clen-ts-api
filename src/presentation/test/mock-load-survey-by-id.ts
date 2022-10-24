import { mockSurvey } from '../../data/test'
import { SurveyModel } from '../../domain/model/survey'
import { LoadSurveyById } from '../../domain/usecases/load-survey-by-id'

export class LoadSurveyByIdSpy implements LoadSurveyById {
  id: string
  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    if (this.id === 'any_survey_id') {
      return await new Promise(resolve => resolve(mockSurvey()))
    }
    return await new Promise(resolve => resolve(null))
  }
}
