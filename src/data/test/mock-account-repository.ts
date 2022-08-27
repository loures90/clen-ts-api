import { UpdateAccessTokenRepository } from '../protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'
import { AccountModel } from '../../domain/model/account'
import { AddAccountParams } from '../../domain/usecases/add-account'
import { AddAccountRepository } from '../protocols/db/account/add-account-repository'
import { mockAccount } from './mock-account'

export const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      const fakeAccount: AccountModel = mockAccount()
      return fakeAccount
    }
  }
  return new AddAccountRepositoryStub()
}

export const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'hash_password'
      }
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccount()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStubStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, accessToken: string): Promise<void> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new UpdateAccessTokenRepositoryStubStub()
}
