import { DbLoadAccountByToken } from '../../../../data/usecases/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountRepository } from '../../../../infra/db/mongodb/account-repository/account'
import env from '../../../config/env'

export const makeDbLoadAccountByToken = (): DbLoadAccountByToken => {
  const accountRepository = new AccountRepository()
  const jsonWebToken = new JwtAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(jsonWebToken, accountRepository)
}
