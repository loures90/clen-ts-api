import { UpdateAccessTokenRepository } from '../protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'
import { AccountModel } from '../../domain/model/account'
import { AddAccountParams } from '../../domain/usecases/add-account'
import { AddAccountRepository } from '../protocols/db/account/add-account-repository'
import { mockAccount } from './mock-account'
import { faker } from '@faker-js/faker'

export class AddAccountRepositorySpy implements AddAccountRepository {
  accountData: AddAccountParams
  fakeAccount: AccountModel

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    this.accountData = accountData
    this.fakeAccount = mockAccount()
    return this.fakeAccount
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  account: AccountModel
  async loadByEmail (email: string): Promise<AccountModel> {
    this.email = email
    if (this.email === 'any_email@email.com') {
      this.account = {
        id: faker.datatype.uuid(),
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'hash_password'
      }
    } else {
      this.account = null
    }
    return this.account
  }
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
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

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccount()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  accessToken: string
  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    this.id = id
    this.accessToken = accessToken
  }
}
