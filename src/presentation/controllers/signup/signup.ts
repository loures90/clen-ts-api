import { badRequest, ok, serverError } from '../../helpers/http/http-helpers'
import { AddAccount, Controller, HttpRequest, HttpResponse } from './protocols'
import { Validation } from '../../protocols/validation'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
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
