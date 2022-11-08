import { makeLoginValidation } from '../../../src/main/factories/controllers/login/login-validation'
import { ValidationComposite, RequiredFieldsValidation, EmailValidation } from '../../../src/validation/validation'
import { Validation } from '../../../src/presentation/protocols/validation'
import { EmailValidator } from '../../../src/validation/protocols/email-validator'

jest.mock('../../../src/validation/validation/')

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
    expect(ValidationComposite).toHaveBeenCalledTimes(1)
  })
})
