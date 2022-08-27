import { AccountModel } from '../../domain/model/account'
import { AddAccountModel } from '../../domain/usecases/add-account'
import { AddAccountRepository } from '../protocols/db/account/add-account-repository'
import { mockAccount } from './mock-account'

export const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount: AccountModel = mockAccount()
      return fakeAccount
    }
  }
  return new AddAccountRepositoryStub()
}
