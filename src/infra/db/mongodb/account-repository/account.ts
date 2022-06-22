import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/model/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import mongoHelper from '../helpers/mongo-helper'

export class AccountRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account: any = { ...accountData }
    const accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.insertOne(account)
    const { _id, ...accountWithoutId } = account
    return Object.assign({}, accountWithoutId, { id: _id.toString() })
  }
}
