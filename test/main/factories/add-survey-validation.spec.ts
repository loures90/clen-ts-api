import { ValidationComposite, RequiredFieldsValidation } from '../../../src/validation/validation'
import { Validation } from '../../../src/presentation/protocols/validation'
import { makeAddSurveyValidation } from '../../../src/main/factories/controllers/add-survey/add-survey-validation'

jest.mock('../../../src/validation/validation')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledTimes(1)
  })
})
