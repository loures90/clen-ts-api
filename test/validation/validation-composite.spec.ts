import { InvalidParamError } from '../../src/presentation/errors'
import { Validation } from '../../src/presentation/protocols/validation'
import { ValidationComposite } from '../../src/validation/validation/validation-composite'

class ValidationSpy implements Validation {
  input: any
  validate (input: any): Error {
    this.input = input
    return null
  }
}


type SutTypes = {
  sut: ValidationComposite
  ValidationStubs: Validation[]
}
const makeSut = (): SutTypes => {
  const ValidationStubs = [new ValidationSpy(), new ValidationSpy()]
  const sut = new ValidationComposite(ValidationStubs)
  return {
    sut,
    ValidationStubs
  }
}

describe('ValidationComposite', () => {
  test('Should call any validation with correct value', () => {
    const { sut, ValidationStubs } = makeSut()
    const validateSpy = jest.spyOn(ValidationStubs[0], 'validate')
    sut.validate('any_value')
    expect(validateSpy).toHaveBeenCalledWith('any_value')
  })

  test('Should return the correct error if one of the validation fails', () => {
    const { sut, ValidationStubs } = makeSut()
    jest.spyOn(ValidationStubs[0], 'validate').mockReturnValueOnce(null)
    jest.spyOn(ValidationStubs[1], 'validate').mockReturnValueOnce(new InvalidParamError('any_field'))
    const error = sut.validate('any_value')
    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should return the correct error if more than one of the validation fails', () => {
    const { sut, ValidationStubs } = makeSut()
    jest.spyOn(ValidationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(ValidationStubs[1], 'validate').mockReturnValueOnce(new InvalidParamError('any_field'))
    const error = sut.validate('any_value')
    expect(error).toEqual(new Error())
  })
})
