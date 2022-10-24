import { serverError } from '../../presentation/helpers/http/http-helpers'
import { Controller, HttpResponse, HttpRequest } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'
import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const controllerSpy = new ControllerSpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

class ControllerSpy implements Controller {
  httpRequest: HttpRequest
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    const httpResponse: HttpResponse = makeFakeResponse()
    return await new Promise(resolve => resolve(httpResponse))
  }
}

class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string
  async logError (stack: string): Promise<void> {
    this.stack = stack
  }
}

const makeFakeResponse = (): HttpResponse => ({
  statusCode: 200,
  body: {
    name: 'any_name'
  }
})

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeFakeRequest = (): HttpRequest => ({ body: { name: 'any_name' } })

describe('LogController Decorator', () => {
  test('Should call handle with correct httpRequest', async () => {
    const { sut, controllerSpy } = makeSut()
    await sut.handle(makeFakeRequest())
    expect(controllerSpy.httpRequest).toEqual(makeFakeRequest())
  })
  test('Should return correct httpResponse on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(makeFakeResponse())
  })
  test('Should calls LogErrorRepository with corrects stack error when controllerr returns a serverError', async () => {
    const { sut, logErrorRepositorySpy, controllerSpy } = makeSut()
    jest.spyOn(controllerSpy, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeServerError())))
    await sut.handle(makeFakeRequest())
    expect(logErrorRepositorySpy.stack).toBe('any_stack')
  })
})
