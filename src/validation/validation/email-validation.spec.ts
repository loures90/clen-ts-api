import { InvalidParamError } from '../../presentation/errors'
import { EmailValidator } from '../protocols/email-validator'
import { EmailValidation } from './email-validation'

class EmailValidatorSpy implements EmailValidator {
  email: string
  isValid (email: string): boolean {
    this.email = email
    return true
  }
}


type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation('email', emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('Email Validation', () => {
  test('Should return InvalidParamError if email is not valid', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@email.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should return calls EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    sut.validate({ email: 'any_email@email.com' })
    expect(emailValidatorSpy.email).toBe('any_email@email.com')
  })

  test('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid')
      .mockImplementationOnce(() => {
        throw new Error('error')
      })
    expect(sut.validate).toThrow()
  })
})
