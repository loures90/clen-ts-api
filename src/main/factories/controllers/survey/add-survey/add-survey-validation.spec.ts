import { ValidationComposite, RequiredFieldsValidation } from '../../../../../validation/validation'
import { Validation } from '../../../../../presentation/protocols'
import { makeAddSurveyValidation } from './add-survey-validation'

jest.mock('../../../../../validation/validation/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
