import { SurveyModel } from '../../../domain/model/survey'
import { LoadSurveysRepository } from '../../protocols/db/surveys/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys'

const makeFakeSurveys = (): SurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_answer',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_answer',
      answer: 'other_answer'
    }],
    date: new Date()
  }
])

describe('DbLoadSurveys', () => {
  test('Ensure DbLoadSurveys calls LoadSurveysRepository correctly', async () => {
    class LoadSurveyRepositoryStub implements LoadSurveysRepository {
      async loadAll (): Promise<SurveyModel[]> {
        return await new Promise(resolve => (resolve(makeFakeSurveys())))
      }
    }
    const loadSurveysRepositoryStub = new LoadSurveyRepositoryStub()
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalledWith()
  })
})
