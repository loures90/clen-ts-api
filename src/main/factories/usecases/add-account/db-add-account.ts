import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../../infra/db/mongodb/account-repository/account'

export const makeDbAddAccount = (): DbAddAccount => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const addAccountRepository = new AccountRepository()
  return new DbAddAccount(hasher, addAccountRepository)
}
