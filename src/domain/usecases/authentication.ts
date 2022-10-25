import { AccountModel } from '../model/account'
import { AuthenticationModel } from '../model/auth'

export type AuthenticationParams = Omit<AccountModel, 'id' | 'name'>

export interface Authenticator {
  auth (authentication: AuthenticationParams): Promise<AuthenticationModel>
}
