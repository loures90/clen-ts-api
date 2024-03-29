import { ObjectId } from 'mongodb'
import { AddAccountRepository } from '../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByTokenRepository } from '../../../data/protocols/db/account/load-account-by-token-repository'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '../../../data/usecases/account/protocols'
import { AccountModel } from '../../../domain/model/account'
import { AddAccountParams } from '../../../domain/usecases/add-account'
import { mongoHelper } from './mongo-helper'

export class AccountRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const account: any = { ...accountData }
    const accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.insertOne(account)
    return mongoHelper.mapper(account)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    if (!account) return null
    return mongoHelper.mapper(account)
  }

  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { accessToken } })
  }

  async loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken,
      $or: [{ role }, { role: 'admin' }]
    })
    if (!account) return null
    return mongoHelper.mapper(account)
  }
}
