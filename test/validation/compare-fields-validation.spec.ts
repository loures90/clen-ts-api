import { InvalidParamError } from '../../src/presentation/errors'
import { CompareFieldsValidation } from '../../src/validation/validation/compare-fields-validation'

describe('CompareFields Validation', () => {
  test('Should return InvalidParamError if fieldName and fieldNameToCompare are not the same', () => {
    const sut = new CompareFieldsValidation('name', 'nameToCompare')
    const error = sut.validate({
      name: 'any_name',
      nameToCompare: 'wrong_name'
    })
    expect(error).toEqual(new InvalidParamError('nameToCompare'))
  })
  test('Should return void if fieldName and fieldNameToCompare are the same', () => {
    const sut = new CompareFieldsValidation('name', 'nameToCompare')
    const error = sut.validate({
      name: 'any_name',
      nameToCompare: 'any_name'
    })
    expect(error).toBeFalsy()
  })
})
