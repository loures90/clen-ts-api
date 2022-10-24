import { AddSurveyResultController } from './add-survey-result'
import { HttpRequest, forbidden, serverError, InvalidParamError, AddSurveyResult, ok } from './protocols'
import mockdate from 'mockdate'
import { mockSurveyResult } from '../../../../data/test'
import { AddSurveyResultSpy, LoadSurveyByIdSpy } from '../../../test'

const mockRequest = (): HttpRequest => ({
  body: {
    answer: 'any_answer'
  },
  params: {
    survey_id: 'any_survey_id'
  },
  account_id: 'any_account_id'
})

const mockInvalidRequest = (): HttpRequest => ({
  body: {
    answer: 'any_answer'
  },
  params: {
    survey_id: 'not_valid_survey_id'
  },
  account_id: 'any_account_id'
})

type SutTypes = {
  sut: AddSurveyResultController
  loadSurveyByIdSpy: LoadSurveyByIdSpy
  addSurveyResultSpy: AddSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const addSurveyResultSpy = new AddSurveyResultSpy()
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const sut = new AddSurveyResultController(loadSurveyByIdSpy, addSurveyResultSpy)
  return {
    sut,
    loadSurveyByIdSpy,
    addSurveyResultSpy
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
    const { sut, loadSurveyByIdSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(loadSurveyByIdSpy.id).toBe('any_survey_id')
  })
  test('Should return 403 when survey_id is not valid', async () => {
    const { sut} = makeSut()
    const httpResponse = await sut.handle(mockInvalidRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('survey_id')))
  })
  test('should throw when LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should return 403 if answer is not valid', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        answer: 'invalid_answer'
      },
      params: {
        survey_id: 'any_survey_id'
      },
      account_id: 'any_account_id'
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })
  test('Should call addSurveyResult with correct values', async () => {
    const { sut, addSurveyResultSpy } = makeSut()
    const addSpy = jest.spyOn(addSurveyResultSpy, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      accountId: 'any_account_id',
      surveyId: 'any_survey_id',
      answer: 'any_answer',
      date: new Date()
    })
  })
  test('should throw when LoadSurveyById throws', async () => {
    const { sut, addSurveyResultSpy } = makeSut()
    jest.spyOn(addSurveyResultSpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResult()))
  })
})
