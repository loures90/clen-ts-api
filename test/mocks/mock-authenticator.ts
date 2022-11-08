import { faker } from '@faker-js/faker'
import { AuthenticationModel } from '../../src/domain/model/auth'
import { AuthenticationParams, Authenticator } from '../../src/domain/usecases/authentication'

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

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.datatype.string(),
  password: faker.datatype.string()
})