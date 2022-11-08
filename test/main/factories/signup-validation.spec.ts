import { makeSignupValidation } from '../../../src/main/factories/controllers/signup/signup-validation'
import { CompareFieldsValidation, EmailValidation, RequiredFieldsValidation, ValidationComposite } from '../../../src/validation/validation'
import { Validation } from '../../../src/presentation/protocols'
import { EmailValidator } from '../../../src/validation/protocols/email-validator'

jest.mock('../../../src/validation/validation')

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignupValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidatorStub()))
    expect(ValidationComposite).toHaveBeenCalledTimes(1)
  })
})
