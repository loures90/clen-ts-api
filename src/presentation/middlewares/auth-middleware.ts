import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok } from '../helpers/http/http-helpers'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role: string
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.header?.['x-access-token']
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken, this.role)
      if (account) {
        return ok(account)
      }
    }
    return await new Promise(resolve => resolve(forbidden(new AccessDeniedError())))
  }
}
