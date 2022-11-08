import { DbLoadAccountByToken } from '../../../../../data/usecases/account/db-load-account-by-token'
import { JwtAdapter } from '../../../../../infra/criptography'
import { AccountRepository } from '../../../../../infra/db/mongodb/account'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): DbLoadAccountByToken => {
  const accountRepository = new AccountRepository()
  const jsonWebToken = new JwtAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(jsonWebToken, accountRepository)
}
