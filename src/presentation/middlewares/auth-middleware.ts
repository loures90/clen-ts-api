import { HttpRequest, HttpResponse, Middleware, LoadAccountByToken } from './protocols'
import { forbidden, ok, serverError } from '../helpers/http/http-helpers'
import { AccessDeniedError } from '../errors/access-denied-error'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role: string
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          return ok(account)
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
