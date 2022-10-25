import { LoginController } from './login'
import { HttpRequest } from './protocols'
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helpers'
import { MissingParamError } from '../../../errors'
import { AuthenticatorSpy, ValidationSpy } from '../../../test'

const mockRequest = (): HttpRequest => ({
  body: {
    password: 'any_password',
    email: 'any_email@email.com'
  }
})

type SutTypes = {
  sut: LoginController
  authenticatorSpy: AuthenticatorSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticatorSpy = new AuthenticatorSpy()
  const sut = new LoginController(authenticatorSpy, validationSpy)
  return {
    sut,
    authenticatorSpy,
    validationSpy
  }
}

describe('Login Controller', () => {
  test('Should call authenticator with correct value', async () => {
    const { sut, authenticatorSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(authenticatorSpy.authentication).toEqual({
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
  test('Should return 401 if authenticator does not return an access_token', async () => {
    const { sut, authenticatorSpy } = makeSut()
    jest.spyOn(authenticatorSpy, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
  test('Should return 500 if authenticator throws', async () => {
    const { sut, authenticatorSpy } = makeSut()
    jest.spyOn(authenticatorSpy, 'auth').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ token: 'access_token', name: 'any_name' }))
  })

  test('Should calls Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(validationSpy.input).toEqual(mockRequest().body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
