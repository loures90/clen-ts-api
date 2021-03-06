import { ValidationComposite, RequiredFieldsValidation, EmailValidation } from '../../../../validation/validation'
import { Validation } from '../../../../presentation/protocols'
import { makeLoginValidation } from './login-validation'
import { EmailValidator } from '../../../../validation/protocols/email-validator'

jest.mock('../../../../validation/validation/validation-composite')

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidatorStub()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
