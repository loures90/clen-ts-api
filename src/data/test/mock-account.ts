import { AccountModel } from '../../domain/model/account'
import { AddAccountModel } from '../../domain/usecases/add-account'
import { AuthenticationModel } from '../../domain/usecases/authentication'

export const mockAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'hashed_password'
})

export const mockAccountData = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

export const mockAuthentication = (): AuthenticationModel => ({
  email: 'any_email@email.com',
  password: 'any_password'
})
