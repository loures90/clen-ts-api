import { makeSignupValidation } from './signup-validation'
import { SignupController } from '../../../../presentation/controllers/'
import { Controller } from '../../../../presentation/protocols'
import { makeLogDecorator } from '../../decorators/log-decorators/log'
import { makeDbAddAccount } from '../../usecases/account/add-account/db-add-account'
import { makeDbAuthenticator } from '../../usecases/account/authenticator/db-authenticator'

export const makeSignupController = (): Controller => {
  const signupController = new SignupController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthenticator())
  return makeLogDecorator(signupController)
}
