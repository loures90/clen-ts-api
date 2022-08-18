import { AccountModel } from '../model/account'

export type AuthenticationModel = Omit<AccountModel, 'id' | 'name'>

export interface Authenticator {
  auth (authentication: AuthenticationModel): Promise<string>
}
