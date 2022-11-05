import mockdate from 'mockdate'
import { LoadSurveyResultController } from './load-survey-result'
import { LoadSurveyByIdSpy, LoadSurveyResultSpy, mockSurveyResult } from '../../../test'
import { HttpRequest, forbidden, serverError, InvalidParamError, ok } from './protocols'
import { faker } from '@faker-js/faker'

const fakeAccountId = faker.datatype.uuid()
const fakeSurveyId = faker.datatype.uuid()
const mockRequest = (): HttpRequest => ({
  account_id: fakeAccountId,
  params: {
    survey_id: fakeSurveyId
  }
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdSpy: LoadSurveyByIdSpy
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const sut = new LoadSurveyResultController(loadSurveyByIdSpy, loadSurveyResultSpy)
  return {
    sut,
    loadSurveyByIdSpy,
    loadSurveyResultSpy
  }
}

describe('LoadSurveyResultController', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })

  test('Should call LoadSurveyById with correct id', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(loadSurveyByIdSpy.surveyId).toBe(fakeSurveyId)
  })

  test('Should return 403 when survey_id is not valid', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockRequest())
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

  test('Should call loadSurveyResultSpy with correct values', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(loadSurveyResultSpy.surveyId).toBe(fakeSurveyId)
    expect(loadSurveyResultSpy.accountId).toBe(fakeAccountId)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResult()))
  })
})
