import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  ValidationStubs: Validation[]
}
const makeSut = (): SutTypes => {
  const ValidationStubs = [makeValidationStub()]
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
})
