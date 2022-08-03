import { Collection } from 'mongodb'
import request from 'supertest'
import mongoHelper from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection
describe('AddSurvey routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })
  beforeEach(async () => {
    surveyCollection = await mongoHelper.getCollection('surveys')
    accountCollection = await mongoHelper.getCollection('accounts')
  })
  afterEach(async () => {
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })
  describe('POST / addSurvey', () => {
    test('Should return 204 on success to admin user', async () => {
      const newAccount = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        role: 'any_role'
      })
      const id = newAccount.insertedId
      const accessToken = await jsonwebtoken.sign({ id }, config.jwtSecret)
      await accountCollection.findOneAndUpdate(
        { _id: id },
        { $set: { accessToken } })
      await request(app)
        .post('/api/survey')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [{
            image: 'any_answer',
            answer: 'any_answer'
          }, {
            answer: 'other_answer'
          }
          ]
        })
        .expect(204)
    })
    test('Should return 403 when no headers is provided', async () => {
      const newAccount = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        role: 'any_role'
      })
      const id = newAccount.insertedId
      const accessToken = await jsonwebtoken.sign({ id }, config.jwtSecret)
      await accountCollection.findOneAndUpdate(
        { _id: id },
        { $set: { accessToken } })
      await request(app)
        .post('/api/survey')
        .send({
          question: 'any_question',
          answers: [{
            image: 'any_answer',
            answer: 'any_answer'
          }, {
            answer: 'other_answer'
          }
          ]
        })
        .expect(403)
    })
  })
})
