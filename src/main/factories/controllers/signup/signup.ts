import { SignupController } from '../../../../presentation/controllers/login/signup/signup'
import { Controller } from '../../../../presentation/protocols'
import { makeLogDecorator } from '../../decorators/log-decorators/log'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account'
import { makeDbAuthenticator } from '../../usecases/authenticator/db-authenticator'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller => {
  const signupController = new SignupController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthenticator())
  return makeLogDecorator(signupController)
}
