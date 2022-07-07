import { Collection, ObjectId } from 'mongodb'
import mongoHelper from '../helpers/mongo-helper'
import { AccountRepository } from './account'

describe('Account MongoRepository', () => {
  let accountCollection: Collection
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })
  beforeEach(async () => {
    accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  const makeSut = (): AccountRepository => {
    return new AccountRepository()
  }
  test('Should call add and return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })

  test('Should call loadByEmail and return an account on success', async () => {
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@email.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })
  test('Should call loadByEmail and return null when no account is found', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@email.com')
    expect(account).toBeFalsy()
  })
  test('Should call updateAccessToken and update the accessToken on success', async () => {
    const fakeAccount = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    }
    await accountCollection.insertOne(fakeAccount)
    const account = mongoHelper.mapper(fakeAccount)
    expect(account.accessToken).toBeFalsy()

    const sut = makeSut()
    await sut.updateAccessToken(account.id, 'any_token')
    const accountWithToken = await accountCollection.findOne({ _id: new ObjectId(account.id) })
    expect(accountWithToken).toBeTruthy()
    expect(accountWithToken.accessToken).toBe('any_token')
  })
})
