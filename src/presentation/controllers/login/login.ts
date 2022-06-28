import { Authenticator } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, unauthorized } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly authenticator: Authenticator) {
    this.emailValidator = emailValidator
    this.authenticator = authenticator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { email, password } = httpRequest.body
    const isValid = this.emailValidator.isValid(email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
    const accessToken = await this.authenticator.auth(email, password)
    if (!accessToken) {
      return unauthorized()
    }
  }
}
