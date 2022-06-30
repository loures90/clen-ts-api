import { serverError } from '../../presentation/helpers/http/http-helpers'
import { Controller, HttpResponse, HttpRequest } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'
import { LogErrorRepository } from '../../data/protocols/db/log-error-repository'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const logErrorRepositoryStub = makeLogErrorRepositoryStub()
  const controllerStub = makeControllerStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = makeFakeResponse()
      return await new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepositoryStub = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> { }
  }
  return new LogErrorRepositoryStub()
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
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
  test('Should return correct httpResponse on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(makeFakeResponse())
  })
  test('Should calls LogErrorRepository with corrects stack error when controllerr returns a serverError', async () => {
    const { sut, logErrorRepositoryStub, controllerStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeServerError())))
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
