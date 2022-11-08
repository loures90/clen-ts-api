import { faker } from '@faker-js/faker'
import { AddAccount, AddAccountParams } from '../../src/domain/usecases/add-account'
import { AccountModel } from '../../src/presentation/middlewares/protocols'

export class AddAccountSpy implements AddAccount {
  addAccount: AddAccountParams
  async add (addAccount: AddAccountParams): Promise<AccountModel> {
    this.addAccount = addAccount
    return await new Promise(resolve => resolve(mockAccount()))
  }
}

export const mockAccount = (): AccountModel => ({
  id: faker.datatype.uuid(),
  name: faker.datatype.string(),
  email: faker.datatype.string(),
  password: faker.datatype.string()
})

export const mockAccountParams = (): AddAccountParams => ({
  name: faker.datatype.string(),
  email: faker.datatype.string(),
  password: faker.datatype.string()
})