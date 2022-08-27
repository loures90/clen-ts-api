import { mockAccount } from '../../data/test'
import { AddAccount, AddAccountParams } from '../../domain/usecases/add-account'
import { AccountModel } from '../middlewares/auth-middleware-protocols'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (addAccount: AddAccountParams): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccount()))
    }
  }
  return new AddAccountStub()
}
