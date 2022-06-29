import { SignupController } from './signup'
import { AddAccount, AddAccountModel, AccountModel, HttpRequest } from './protocols'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { Validation } from '../../helpers/validation/validation'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (addAccount: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeResponse()))
    }
  }
  return new AddAccountStub()
}

interface SutTypes {
  sut: SignupController
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addAccountStub = makeAddAccountStub()
  const sut = new SignupController(addAccountStub, validationStub)
  return {
    sut,
    addAccountStub,
    validationStub
  }
}

const makeFakeResponse = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

describe('Signup Controller', () => {
  test('Should return calls AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add')
      .mockImplementationOnce(() => {
        throw new Error('error')
      })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error('error')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeResponse()))
  })

  test('Should return calls Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validatorSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validatorSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
