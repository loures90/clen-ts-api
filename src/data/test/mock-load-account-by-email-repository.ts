import { AccountModel } from '../../domain/model/account'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'

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
