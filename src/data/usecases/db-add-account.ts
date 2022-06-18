import { AccountModel } from '../../domain/model/account'
import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account'
import { Encrypter } from '../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (addAccountData: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(addAccountData.password)
    return null
  }
}
