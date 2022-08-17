import { AccountModel } from '../model/account'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add (addAccount: AddAccountModel): Promise<AccountModel>
}
