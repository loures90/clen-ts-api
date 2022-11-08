import { AddSurveyController } from '../../../src/presentation/controllers'
import { HttpRequest } from '../../../src/presentation/protocols'
import { badRequest, serverError, noContent } from '../../../src/presentation/helpers/http/http-helpers'
import { MissingParamError } from '../../../src/presentation/errors'
import mockdate from 'mockdate'
import { AddSurveySpy, ValidationSpy } from '../../mocks'

type SutTypes = {
  sut: AddSurveyController
  validationSpy: ValidationSpy
  addSurveySpy: AddSurveySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addSurveySpy = new AddSurveySpy()
  const sut = new AddSurveyController(validationSpy, addSurveySpy)
  return {
    sut,
    validationSpy,
    addSurveySpy
  }
}

const mockRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

describe('AddSurveyController', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })

  test('should call validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest: HttpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })
  test('should return 400 if validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_param')))
  })
  test('should call AddSurvey with correct values', async () => {
    const { sut, addSurveySpy } = makeSut()
    await sut.handle(mockRequest())
    expect(addSurveySpy.data).toEqual({
      ...mockRequest().body,
      date: new Date()
    })
  })
  test('should throw when addSurvey throws', async () => {
    const { sut, addSurveySpy } = makeSut()
    jest.spyOn(addSurveySpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
