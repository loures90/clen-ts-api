import { SurveyModel } from './protocols'
import { LoadSurveysController } from './load-surveys'
import mockdate from 'mockdate'
import { LoadSurveys } from '../../../../domain/usecases/load-surveys'

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

describe('LoadSurveysController', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Should call LoadSurveys', async () => {
    class LoadSurveyStub implements LoadSurveys {
      async load (): Promise<SurveyModel[]> {
        return await new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }
    const loadSurveyStub = new LoadSurveyStub()
    const sut = new LoadSurveysController(loadSurveyStub)
    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledWith()
  })
})
