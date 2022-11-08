import { SurveyModel } from '../../src/domain/model/survey'
import { AddSurveyParams } from '../../src/domain/usecases/add-survey'
import { AddSurveyRepository } from '../../src/data/protocols/db/surveys/add-survey-repository'
import { LoadSurveyByIdRepository } from '../../src/data/protocols/db/surveys/load-survey-by-id-repository'
import { LoadSurveysRepository } from '../../src/data/protocols/db/surveys/load-surveys-repository'
import { mockSurvey, mockSurveys } from './index'

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
  accountId: string
  async loadAll (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await new Promise(resolve => (resolve(mockSurveys())))
  }
}
