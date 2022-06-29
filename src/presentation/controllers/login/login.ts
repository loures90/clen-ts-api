import { Authenticator, Controller, HttpRequest, HttpResponse } from './protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { Validation } from '../../helpers/validation/validation'

export class LoginController implements Controller {
  constructor (
    private readonly authenticator: Authenticator,
    private readonly validation: Validation
  ) {
    this.validation = validation
    this.authenticator = authenticator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authenticator.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
