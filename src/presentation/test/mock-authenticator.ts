import { AuthenticationParams, Authenticator } from '../../domain/usecases/authentication'

export class AuthenticatorSpy implements Authenticator {
  authentication: AuthenticationParams
  async auth (authentication: AuthenticationParams): Promise<string> {
    this.authentication = authentication
    return await new Promise(resolve => resolve('access_token'))
  }
}

