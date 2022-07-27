import { makeLoginValidation } from './login-validation'
import { Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/login'
import { LogControllerDecorator } from '../../../decorators/log'
import { LogMongoRepository } from '../../../../infra/db/mongodb/log-repository/log'
import { makeDbAuthenticator } from '../../usecases/authenticator/db-authenticator'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthenticator(), makeLoginValidation())
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logErrorRepository)
}
