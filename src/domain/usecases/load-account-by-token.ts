import { AccountModel } from '../model/account'

export interface LoadAccountByToken {
  load (token: string, role?: string): Promise<AccountModel>
}
