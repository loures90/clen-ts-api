import { faker } from '@faker-js/faker'
import mockdate from 'mockdate'
import { LoadSurveysController } from '../../../src/presentation/controllers'
import { ok, serverError, noContent } from '../../../src/presentation/helpers/http/http-helpers'
import { mockSurveys, LoadSurveysSpy } from '../../mocks'
import { HttpRequest } from '../../../src/presentation/protocols'

const mockRequest = (): HttpRequest => ({ account_id: faker.datatype.uuid() })

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveysController', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Should call LoadSurveys with correct account_id', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const httpRequest: HttpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSurveysSpy.account_id).toBe(httpRequest.account_id)
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveys()))
  })
  test('should throw when loadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 204 when LoadSurveys returns an empty array', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
