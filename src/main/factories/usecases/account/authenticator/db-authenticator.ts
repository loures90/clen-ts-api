import { DbAuthenticator } from '../../../../../data/usecases/account/authenticator/db-authenticator'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountRepository } from '../../../../../infra/db/mongodb/account-repository/account'
import env from '../../../../config/env'

export const makeDbAuthenticator = (): DbAuthenticator => {
  const accountRepository = new AccountRepository()
  const hash = new BcryptAdapter(env.salt)
  const jsonWebToken = new JwtAdapter(env.jwtSecret)
  return new DbAuthenticator(accountRepository, hash, jsonWebToken, accountRepository)
}
