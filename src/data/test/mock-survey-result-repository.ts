import { SurveyResultModel } from '../../domain/model/survey-result'
import { AddSurveyResultParams } from '../../domain/usecases/add-survey-result'
import { AddSurveyResultRepository } from '../protocols/db/survey-result/add-survey-result-repository'
import { LoadSurveyResultRepository } from '../protocols/db/survey-result/load-survey-result-repository'
import { mockSurveyResult } from './mock-survey-result'

export class AddSurveyResultRepositorySpy implements AddSurveyResultRepository {
  data: AddSurveyResultParams
  async add (data: AddSurveyResultParams): Promise<void> {
    this.data = data
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyId: string
  async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    if (this.surveyId === 'any_survey_id') {
      return await new Promise(resolve => resolve(mockSurveyResult()))
    }
    return null
  }
}
