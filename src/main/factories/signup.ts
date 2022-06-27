import { DbAddAccount } from '../../data/usecases/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignupController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignupController = (): Controller => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const emailValidator = new EmailValidatorAdapter()
  const signupController = new SignupController(emailValidator, addAccount)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logErrorRepository)
}
