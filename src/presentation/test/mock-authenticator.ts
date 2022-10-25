import { AuthenticationModel } from '../../domain/model/auth'
import { AuthenticationParams, Authenticator } from '../../domain/usecases/authentication'

export class AuthenticatorSpy implements Authenticator {
  authentication: AuthenticationParams
  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    this.authentication = authentication
    return await new Promise(resolve => resolve({
      token: 'access_token',
      name: 'any_name'
    }))
  }
}
