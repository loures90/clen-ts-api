import { makeLoginValidation } from './login-validation'
import { Controller } from '../../../../presentation/protocols'
import { makeDbAuthenticator } from '../../usecases/authenticator/db-authenticator'
import { makeLogDecorator } from '../../decorators/log-decorators/log'
import { LoginController } from '../../../../presentation/controllers/login/login/login'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthenticator(), makeLoginValidation())
  return makeLogDecorator(loginController)
}
