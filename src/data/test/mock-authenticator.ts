import { AuthenticationModel } from '../../domain/usecases/authentication'

export const mockAuthentication = (): AuthenticationModel => ({
  email: 'any_email@email.com',
  password: 'any_password'
})
