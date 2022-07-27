import { LogMongoRepository } from '../../../../infra/db/mongodb/log-repository/log'
import { SignupController } from '../../../../presentation/controllers/signup/signup'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account'
import { makeDbAuthenticator } from '../../usecases/authenticator/db-authenticator'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller => {
  const signupController = new SignupController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthenticator())
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logErrorRepository)
}
