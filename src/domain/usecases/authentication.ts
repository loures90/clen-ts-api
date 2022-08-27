import { AccountModel } from '../model/account'

export type AuthenticationParams = Omit<AccountModel, 'id' | 'name'>

export interface Authenticator {
  auth (authentication: AuthenticationParams): Promise<string>
}
