import { ValidationComposite, RequiredFieldsValidation } from '../../../../../validation/validation'
import { Validation } from '../../../../../presentation/protocols'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
