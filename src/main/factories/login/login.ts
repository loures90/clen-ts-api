import { makeLoginValidation } from './login-validation'
import { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/login'
import { LogControllerDecorator } from '../../decorators/log'
import { DbAuthenticator } from '../../../data/usecases/authenticator/db-authenticator'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import env from '../../config/env'

export const makeLoginController = (): Controller => {
  const accountRepository = new AccountRepository()
  const hash = new BcryptAdapter(env.salt)
  const jsonWebToken = new JwtAdapter(env.jwtSecret)
  const dbAuthenticator = new DbAuthenticator(accountRepository, hash, jsonWebToken, accountRepository)
  const loginController = new LoginController(dbAuthenticator, makeLoginValidation())
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logErrorRepository)
}
