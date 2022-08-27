import { AccountModel } from '../../domain/model/account'
import { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'
import { mockAccount } from './mock-account'

export const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccount()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}
