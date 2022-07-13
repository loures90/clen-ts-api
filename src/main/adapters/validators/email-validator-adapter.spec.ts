import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}
describe('Email Validator Adapter', () => {
  test('should return false whem email is not valid', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const res = sut.isValid('invalid_email@email.com')
    expect(res).toBe(false)
  })
  test('should return true whem email is valid', () => {
    const sut = makeSut()
    const res = sut.isValid('valid_email@email.com')
    expect(res).toBe(true)
  })
  test('should call validator with corect email', () => {
    const sut = makeSut()
    const validatorSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('valid_email@email.com')
    expect(validatorSpy).toHaveBeenCalledWith('valid_email@email.com')
  })
})
