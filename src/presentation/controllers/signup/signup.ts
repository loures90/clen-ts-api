import { badRequest, forbidden, ok, serverError } from '../../helpers/http/http-helpers'
import { AddAccount, Controller, HttpRequest, HttpResponse, Authenticator } from './protocols'
import { Validation } from '../../protocols/validation'
import { EmailAlreadyInUseError } from '../../errors'

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
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      if (!accessToken) {
        return forbidden(new EmailAlreadyInUseError())
      }
      return ok({ accessToken, name })
    } catch (error) {
      return serverError(error)
    }
  }
}
