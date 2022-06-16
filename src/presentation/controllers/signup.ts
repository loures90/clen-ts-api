import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { badRequest, ok, serverError } from '../helpers/http-helpers'
import { InvalidParamError, MissingParamError } from '../errors'
import { AddAccount } from '../../domain/usecases/add-account'

export class SignupController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']
      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }
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
      return serverError()
    }
  }
}
