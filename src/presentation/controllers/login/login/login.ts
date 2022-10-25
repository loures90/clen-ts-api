import { Authenticator, Controller, HttpRequest, HttpResponse } from './protocols'
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helpers'
import { Validation } from '../../../protocols/validation'

export class LoginController implements Controller {
  constructor (
    private readonly authenticator: Authenticator,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const authenticationModel = await this.authenticator.auth({ email, password })
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
