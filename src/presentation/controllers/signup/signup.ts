import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { EmailValidator, AddAccount, Controller, HttpRequest, HttpResponse } from './protocols'
import { InvalidParamError } from '../../errors'
import { Validation } from '../../helpers/validation/validation'

export class SignupController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validator: Validation
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validator = validator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validator.validate(httpRequest.body)
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('password'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccount.add({
        name: name,
        email: email,
        password: password
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
