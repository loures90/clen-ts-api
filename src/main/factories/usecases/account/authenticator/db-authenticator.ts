import { DbAuthenticator } from '../../../../../data/usecases/account/db-authenticator'
import { BcryptAdapter, JwtAdapter } from '../../../../../infra/criptography'
import { AccountRepository } from '../../../../../infra/db/mongodb/account'
import env from '../../../../config/env'

export const makeDbAuthenticator = (): DbAuthenticator => {
  const accountRepository = new AccountRepository()
  const hash = new BcryptAdapter(env.salt)
  const jsonWebToken = new JwtAdapter(env.jwtSecret)
  return new DbAuthenticator(accountRepository, hash, jsonWebToken, accountRepository)
}
