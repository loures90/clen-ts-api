import { Collection } from 'mongodb'
import request from 'supertest'
import mongoHelper from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { hash } from 'bcrypt'
import env from '../config/env'

let accountCollection: Collection
describe('Login routes', () => {
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
  describe('POST / signup', () => {
    test('Should return an account on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email@email.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
        .expect(200)
    })
  })
  describe('POST / login', () => {
    test('Should return 200 on success', async () => {
      const password = await hash('123', env.salt)
      await accountCollection.insertOne({
        name: 'fernando',
        email: 'fernando@email.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'fernando@email.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on invalid password', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@email.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
