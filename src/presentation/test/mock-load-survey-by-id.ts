import { mockSurvey } from '../../data/test'
import { SurveyModel } from '../../domain/model/survey'
import { LoadSurveyById } from '../../domain/usecases/load-survey-by-id'

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyId: string
  async loadById (surveyId: string): Promise<SurveyModel> {
    this.surveyId = surveyId
    if (this.surveyId === 'wrong_survey_id') {
      return await new Promise(resolve => resolve(null))
    }
    return await new Promise(resolve => resolve(mockSurvey()))
  }
}
