import { AccountModel } from '../../domain/model/account'
import { AddAccountParams } from '../../domain/usecases/add-account'
import { AuthenticationParams } from '../../domain/usecases/authentication'

export const mockAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'hashed_password'
})

export const mockAccountData = (): AddAccountParams => ({
  name: 'new_name',
  email: 'new_email@email.com',
  password: 'new_password'
})

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@email.com',
  password: 'any_password'
})
