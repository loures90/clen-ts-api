import { AuthenticationParams, Authenticator } from '../../domain/usecases/authentication'

export const mockAuthenticator = (): Authenticator => {
  class AuthenticatorStub implements Authenticator {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return await new Promise(resolve => resolve('access_token'))
    }
  }
  return new AuthenticatorStub()
}
