import { DbAddAccount } from '../../../../../data/usecases/account/db-add-account'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter'
import { AccountRepository } from '../../../../../infra/db/mongodb'

export const makeDbAddAccount = (): DbAddAccount => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const accountRepository = new AccountRepository()
  return new DbAddAccount(hasher, accountRepository, accountRepository)
}
