import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AccountModel } from '../../../../domain/model/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import mongoHelper from '../helpers/mongo-helper'

export class AccountRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account: any = { ...accountData }
    const accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.insertOne(account)
    return mongoHelper.mapper(account)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email: email })
    return mongoHelper.mapper(account)
  }
}
