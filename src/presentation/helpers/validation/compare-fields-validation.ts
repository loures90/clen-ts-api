import { InvalidParamError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly comparedFieldName: string) {
    this.fieldName = fieldName
    this.comparedFieldName = comparedFieldName
  }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.comparedFieldName]) {
      return new InvalidParamError(this.comparedFieldName)
    }
  }
}
