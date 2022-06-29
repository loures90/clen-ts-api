import { CompareFieldsValidation } from '../../presentation/helpers/validation/compare-fields-validation'
import { EmailValidation } from '../../presentation/helpers/validation/email-validation'
import { RequiredFieldsValidation } from '../../presentation/helpers/validation/required-fields-validation'
import { Validation } from '../../presentation/helpers/validation/validation'
import { ValidationComposite } from '../../presentation/helpers/validation/validation-composite'
import { EmailValidator } from '../../presentation/protocols/email-validator'
import { makeSignupValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validation/validation-composite')

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
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
