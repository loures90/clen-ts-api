import { mockAccount } from '../../data/test'
import { AddAccount, AddAccountParams } from '../../domain/usecases/add-account'
import { AccountModel } from '../middlewares/auth-middleware-protocols'

export class AddAccountSpy implements AddAccount {
  addAccount: AddAccountParams
  async add (addAccount: AddAccountParams): Promise<AccountModel> {
    this.addAccount = addAccount
    return await new Promise(resolve => resolve(mockAccount()))
  }
}
