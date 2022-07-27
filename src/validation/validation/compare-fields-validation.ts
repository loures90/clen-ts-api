import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly comparedFieldName: string) { }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.comparedFieldName]) {
      return new InvalidParamError(this.comparedFieldName)
    }
  }
}
