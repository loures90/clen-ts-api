import { AccountModel } from '../model/account'

export interface LoadAccountByToken {
  load (token: string): Promise<AccountModel>
}
