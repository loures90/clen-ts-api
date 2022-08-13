import { Collection } from 'mongodb'
import request from 'supertest'
import mongoHelper from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/env'

const makeFakeAccessToken = async (role?: string): Promise<string> => {
  let newAccount
  if (role === 'admin') {
    newAccount = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      role
    })
  } else {
    newAccount = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  }
  const id = newAccount.insertedId
  const accessToken = await jsonwebtoken.sign({ id }, config.jwtSecret)
  await accountCollection.findOneAndUpdate(
    { _id: id },
    { $set: { accessToken } })
  return accessToken
}

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
      const accessToken = await makeFakeAccessToken('admin')
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

    test('Should return 403 for not admin role', async () => {
      const accessToken = await makeFakeAccessToken('not_admin')
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
        .expect(403)
    })
    test('Should return 403 when no headers is provided', async () => {
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
  describe('Get / surveys', () => {
    test('Should return 403 if not token is provided', async () => {
      await request(app)
        .get('/api/surveys')
        .send()
        .expect(403)
    })
    test('Should return 200 on success', async () => {
      const surveyData = {
        question: 'any_question',
        answers: [{
          image: 'any_answer',
          answer: 'any_answer'
        }, {
          answer: 'other_answer'
        }],
        date: new Date()
      }
      await surveyCollection.insertOne(surveyData)
      const accessToken = await makeFakeAccessToken()
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .send()
        .expect(200)
    })
  })
})
