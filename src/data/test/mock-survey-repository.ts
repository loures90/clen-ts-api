import { SurveyModel } from '../../domain/model/survey'
import { AddSurveyParams } from '../../domain/usecases/add-survey'
import { AddSurveyRepository } from '../protocols/db/surveys/add-survey-repository'
import { LoadSurveyByIdRepository } from '../protocols/db/surveys/load-survey-by-id-repository'
import { LoadSurveysRepository } from '../protocols/db/surveys/load-surveys-repository'
import { mockSurvey, mockSurveys } from './mock-survey'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new AddSurveyRepositoryStub()
}

export const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => (resolve(mockSurvey())))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const makeLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise(resolve => (resolve(mockSurveys())))
    }
  }
  return new LoadSurveyRepositoryStub()
}
