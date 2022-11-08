import { UpdateAccessTokenRepository } from '../../src/data/protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '../../src/data/protocols/db/account/load-account-by-token-repository'
import { LoadAccountByEmailRepository } from '../../src/data/protocols/db/account/load-account-by-email-repository'
import { AccountModel } from '../../src/domain/model/account'
import { AddAccountParams } from '../../src/domain/usecases/add-account'
import { AddAccountRepository } from '../../src/data/protocols/db/account/add-account-repository'
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
    this.account = {
      id: faker.datatype.uuid(),
      name: 'any_name',
      email: this.email,
      password: 'hash_password'
    }
    return this.account
  }
}

export class LoadAccountByEmailRepositoryReturnsNullSpy implements LoadAccountByEmailRepository {
  email: string
  account: AccountModel
  async loadByEmail (email: string): Promise<AccountModel> {
    this.email = email
    this.account = null
    return this.account
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  role: string | undefined
  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    this.token = token
    this.role = role
    return await new Promise(resolve => resolve(mockAccount()))
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  accessToken: string
  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    this.id = id
    this.accessToken = accessToken
  }
}
