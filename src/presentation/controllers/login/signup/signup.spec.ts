import { SignupController } from './signup'
import { HttpRequest } from './protocols'
import { MissingParamError, EmailAlreadyInUseError } from '../../../errors'
import { badRequest, ok, serverError, forbidden } from '../../../helpers/http/http-helpers'
import { ValidationSpy, AuthenticatorSpy, AddAccountSpy } from '../../../test'

type SutTypes = {
  sut: SignupController
  addAccountSpy: AddAccountSpy
  validationSpy: ValidationSpy
  authenticatorSpy: AuthenticatorSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()
  const authenticatorSpy = new AuthenticatorSpy()
  const sut = new SignupController(addAccountSpy, validationSpy, authenticatorSpy)
  return {
    sut,
    addAccountSpy,
    validationSpy,
    authenticatorSpy
  }
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

describe('Signup Controller', () => {
  test('Should return calls AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const addSpy = jest.spyOn(addAccountSpy, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add')
      .mockImplementationOnce(() => {
        throw new Error('error')
      })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error('error')))
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
  test('Should call authenticator with correct value', async () => {
    const { sut, authenticatorSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(authenticatorSpy.authentication).toEqual({
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
  test('Should return 500 if authenticator throws', async () => {
    const { sut, authenticatorSpy } = makeSut()
    jest.spyOn(authenticatorSpy, 'auth').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 When email is already in use', async () => {
    const { sut, authenticatorSpy } = makeSut()
    jest.spyOn(authenticatorSpy, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailAlreadyInUseError()))
  })
})
