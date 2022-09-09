import { AddSurveyResultController } from './add-survey-result'
import { LoadSurveyById, HttpRequest, forbidden, serverError, InvalidParamError, AddSurveyResult, ok } from './protocols'
import mockdate from 'mockdate'
import { mockSurveyResult } from '../../../../data/test'
import { mockLoadSurveyById, mockAddSurveyResult } from '../../../test'

const mockRequest = (): HttpRequest => ({
  body: {
    answer: 'any_answer'
  },
  params: {
    survey_id: 'any_survey_id'
  },
  account_id: 'any_account_id'
})

type SutTypes = {
  sut: AddSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  addSurveyResultStub: AddSurveyResult
}

const makeSut = (): SutTypes => {
  const addSurveyResultStub = mockAddSurveyResult()
  const loadSurveyByIdStub = mockLoadSurveyById()
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
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
  test('Should return 403 when survey_id is not valid', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('survey_id')))
  })
  test('should throw when LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(() => {
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
        survey_id: 'other_survey_id'
      },
      account_id: 'other_account_id'
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })
  test('Should call addSurveyResult with correct values', async () => {
    const { sut, addSurveyResultStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyResultStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      accountId: 'any_account_id',
      surveyId: 'any_survey_id',
      answer: 'any_answer',
      date: new Date()
    })
  })
  test('should throw when LoadSurveyById throws', async () => {
    const { sut, addSurveyResultStub } = makeSut()
    jest.spyOn(addSurveyResultStub, 'add').mockImplementationOnce(() => {
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
