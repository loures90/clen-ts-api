import { makeLoginValidation } from './login-validation'
import { Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/login'
import { makeDbAuthenticator } from '../../usecases/authenticator/db-authenticator'
import { makeLogDecorator } from '../../decorators/log-decorators/log'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthenticator(), makeLoginValidation())
  return makeLogDecorator(loginController)
}
