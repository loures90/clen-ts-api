import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { badRequest, serverError } from '../helpers/http-helpers'
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

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']
      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('password'))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccount.add({
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        password: httpRequest.body.password
      })
    } catch (error) {
      return serverError()
    }
  }
}
