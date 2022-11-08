import { badRequest, forbidden, ok, serverError } from '../helpers/http/http-helpers'
import { AddAccount, Controller, HttpRequest, HttpResponse, Authenticator, Validation } from './protocols'
import { EmailAlreadyInUseError } from '../errors'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authenticator
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      await this.addAccount.add({
        name,
        email,
        password
      })
      const authenticationModel = await this.authentication.auth({
        email,
        password
      })
      if (!authenticationModel) {
        return forbidden(new EmailAlreadyInUseError())
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
