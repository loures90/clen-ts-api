import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByToken, HttpRequest, AccountModel } from './auth-middleware-protocols'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok, serverError } from '../helpers/http/http-helpers'
import { mockAccount } from '../../data/test'

const makeFakeHttpRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

class LoadAccountByTokenSpy implements LoadAccountByToken {
  token: string
  role?: string
  async load (token: string, role?: string): Promise<AccountModel> {
    this.token = token
    this.role = role
    return await new Promise(resolve => resolve(mockAccount()))
  }
}

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('AuthMiddleware', () => {
  test('Should return 403 if x-access-token is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ headers: {} })
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should return 403 if headers is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should call loadAccountByToken with correct values', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut('any_role')
    await sut.handle(makeFakeHttpRequest())
    expect(loadAccountByTokenSpy.token).toEqual('any_token')
    expect(loadAccountByTokenSpy.role).toEqual('any_role')
  })
  test('Should return account on success', async () => {
    const { sut } = makeSut('any_role')
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok(mockAccount()))
  })
  test('Should return status 500 when loadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut('any_role')
    jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
