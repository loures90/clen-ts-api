import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByToken, HttpRequest, AccountModel } from './auth-middleware-protocols'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok, serverError } from '../helpers/http/http-helpers'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'hashed_password'
})

const makeFakeHttpRequest = (): HttpRequest => ({
  header: {
    'x-access-token': 'any_token'
  }
})

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (token: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('AuthMiddleware', () => {
  test('Should return 403 if x-access-token is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ header: {} })
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should return 403 if header is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should call loadAccountByToken with correct values', async () => {
    const { sut, loadAccountByTokenStub } = makeSut('any_role')
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })
  test('Should return account on success', async () => {
    const { sut } = makeSut('any_role')
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })
  test('Should return status 500 when loadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut('any_role')
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
