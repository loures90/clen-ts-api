import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

describe('CompareFields Validation', () => {
  test('Should return InvalidParamError if fieldName and fieldNameToCompare are not the same', () => {
    const sut = new CompareFieldsValidation('name', 'nameToCompare')
    const error = sut.validate({
      name: 'any_name',
      nameToCompare: 'wrong_name'
    })
    expect(error).toEqual(new InvalidParamError('nameToCompare'))
  })
})
