import { MissingParamError } from '../../errors'
import { RequiredFieldsValidation } from './required-fields-validation'

describe('RequiredFieldsValidation Validation', () => {
  const makeSut = (): RequiredFieldsValidation => {
    return new RequiredFieldsValidation('field')
  }
  test('Should return MissingParamError fieldName is not provided', () => {
    const sut = makeSut()
    const error = sut.validate({
      other_field: 'any_value'
    })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Should return void if fieldName and fieldNameToCompare are the same', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
