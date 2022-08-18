import { AccountModel } from '../model/account'

export type AddAccountModel = Omit<AccountModel, 'id'>

export interface AddAccount {
  add (addAccount: AddAccountModel): Promise<AccountModel>
}
