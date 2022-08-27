import { AddSurveyResultController } from './add-survey-result'
import { LoadSurveyById, SurveyModel, HttpRequest, forbidden, serverError, InvalidParamError, AddSurveyResult } from './protocols'
import mockdate from 'mockdate'
import { SurveyResultModel } from '../../../../domain/model/survey-result'
import { AddSurveyResultModel } from '../../../../domain/usecases/add-survey-result'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    answer: 'any_answer'
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

const makeFakeSurveyResult = (): SurveyResultModel => (
  {
    id: 'any_id',
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
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

const makeAddSurveyResult = (): AddSurveyResult => {
  class AddSurveyResultStub implements AddSurveyResult {
    async add (data: AddSurveyResultModel): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }
  return new AddSurveyResultStub()
}

type SutTypes = {
  sut: AddSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  addSurveyResultStub: AddSurveyResult
}

const makeSut = (): SutTypes => {
  const addSurveyResultStub = makeAddSurveyResult()
  const loadSurveyByIdStub = makeLoadSurveyById()
  const sut = new AddSurveyResultController(loadSurveyByIdStub, addSurveyResultStub)
  return {
    sut,
    loadSurveyByIdStub,
    addSurveyResultStub
  }
}

describe('AddSurveyResltController', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })

  test('Should call LoadSurveyById with correct id', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
  test('Should return 403 when survey_id is not valid', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('survey_id')))
  })
  test('should throw when LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should return 403 if answer is not valide', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        answer: 'other_answer'
      },
      params: {
        survey_id: 'other_survey_id'
      },
      account_id: 'other_account_id'
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })
  // test('Should call addSurveyResult with correct values', async () => {
  //   const { sut, addSurveyResultStub } = makeSut()
  //   const addSpy = jest.spyOn(addSurveyResultStub, 'add')
  //   await sut.handle(makeFakeRequest())
  //   expect(addSpy).toHaveBeenCalledWith({
  //     accountId: 'any_account_id',
  //     surveyId: 'any_answer_id',
  //     answer: 'any_answer',
  //     date: new Date()
  //   })
  // })
})
