import { LoginController } from './login'
import { Authenticator, HttpRequest, Validation } from './protocols'
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helpers'
import { MissingParamError } from '../../../errors'
import { mockValidation, mockAuthenticator } from '../../../test'

const mockRequest = (): HttpRequest => ({
  body: {
    password: 'any_password',
    email: 'any_email@email.com'
  }
})

type SutTypes = {
  sut: LoginController
  authenticatorStub: Authenticator
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const authenticatorStub = mockAuthenticator()
  const sut = new LoginController(authenticatorStub, validationStub)
  return {
    sut,
    authenticatorStub,
    validationStub
  }
}

describe('Login Controller', () => {
  test('Should call authenticator with correct value', async () => {
    const { sut, authenticatorStub } = makeSut()
    const validatorSpy = jest.spyOn(authenticatorStub, 'auth')
    await sut.handle(mockRequest())
    expect(validatorSpy).toHaveBeenCalledWith({
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
  test('Should return 401 if authenticator does not return an access_token', async () => {
    const { sut, authenticatorStub } = makeSut()
    jest.spyOn(authenticatorStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
  test('Should return 500 if authenticator throws', async () => {
    const { sut, authenticatorStub } = makeSut()
    jest.spyOn(authenticatorStub, 'auth').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'access_token' }))
  })

  test('Should calls Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validatorSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validatorSpy).toHaveBeenCalledWith(mockRequest().body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
