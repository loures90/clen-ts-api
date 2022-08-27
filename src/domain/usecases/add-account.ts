import { AccountModel } from '../model/account'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccount {
  add (addAccount: AddAccountParams): Promise<AccountModel>
}
