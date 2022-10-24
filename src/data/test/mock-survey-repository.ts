import { SurveyModel } from '../../domain/model/survey'
import { AddSurveyParams } from '../../domain/usecases/add-survey'
import { AddSurveyRepository } from '../protocols/db/surveys/add-survey-repository'
import { LoadSurveyByIdRepository } from '../protocols/db/surveys/load-survey-by-id-repository'
import { LoadSurveysRepository } from '../protocols/db/surveys/load-surveys-repository'
import { mockSurvey, mockSurveys } from './mock-survey'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  surveyData: AddSurveyParams
  async add (surveyData: AddSurveyParams): Promise<void> {
    this.surveyData = surveyData
    return await new Promise(resolve => resolve(null))
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  id: string
  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return await new Promise(resolve => (resolve(mockSurvey())))
  }
}

export class LoadSurveyRepositorySpy implements LoadSurveysRepository {
  async loadAll (): Promise<SurveyModel[]> {
    return await new Promise(resolve => (resolve(mockSurveys())))
  }
}
