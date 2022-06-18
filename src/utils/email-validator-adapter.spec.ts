import { EmailValidatorAdapter } from './email-validator-adapter'

describe('Email Validator Adapter', () => {
  test('should return false whem email is not valid', () => {
    const sut = new EmailValidatorAdapter()
    const res = sut.isValid('invalid_email@email.com')
    expect(res).toBe(false)
  })
})
