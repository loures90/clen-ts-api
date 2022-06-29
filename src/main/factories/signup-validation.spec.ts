import { CompareFieldsValidation } from '../../presentation/helpers/validation/compare-fields-validation'
import { RequiredFieldsValidation } from '../../presentation/helpers/validation/required-fields-validation'
import { Validation } from '../../presentation/helpers/validation/validation'
import { ValidationComposite } from '../../presentation/helpers/validation/validation-composite'
import { makeSignupValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validation/validation-composite')

describe('SignupValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
