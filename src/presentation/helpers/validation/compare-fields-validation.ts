import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

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
