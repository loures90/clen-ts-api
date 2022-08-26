import { AddSurveyResultController } from './add-survey-result'
import { LoadSurveyById, SurveyModel, HttpRequest } from './protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    answer: {
      image: 'any_image',
      answer: 'any_answer'
    }
  },
  params: {
    survey_id: 'any_survey_id'
  },
  account_id: 'any_account_id'
})

const makeFakeSurvey = (): SurveyModel => (
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_answer',
      answer: 'any_answer'
    }],
    date: new Date()
  })

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSurveyByIdStub()
}

type SutTypes = {
  sut: AddSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const sut = new AddSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('AddSurveyResltController', () => {
  test('Should call LoadSurveyById with correct id', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
