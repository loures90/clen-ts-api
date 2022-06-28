import { ValidationComposite } from '../../presentation/helpers/validation/validation-composite'
import { RequiredFieldsValidation } from '../../presentation/helpers/validation/required-fields-validation'
import { Validation } from '../../presentation/helpers/validation/validation'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
