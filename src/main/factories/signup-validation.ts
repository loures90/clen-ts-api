import { ValidationComposite } from '../../presentation/helpers/validation/validation-composite'
import { RequiredFieldsValidation } from '../../presentation/helpers/validation/required-fields-validation'
import { Validation } from '../../presentation/helpers/validation/validation'
import { CompareFieldsValidation } from '../../presentation/helpers/validation/compare-fields-validation'
import { EmailValidation } from '../../presentation/helpers/validation/email-validation'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
