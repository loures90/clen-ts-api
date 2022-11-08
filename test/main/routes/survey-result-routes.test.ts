/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Collection } from 'mongodb'
import request from 'supertest'
import { mongoHelper } from '../../../src/infra/db/mongodb/index'
import app from '../../../src/main/config/app'
import jsonwebtoken from 'jsonwebtoken'
import config from '../../../src/main/config/env'

const makeFakeAccessToken = async (role?: string): Promise<any> => {
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
  return { accessToken, id }
}

let surveyResultCollection: Collection
let surveyCollection: Collection
let accountCollection: Collection
describe('SurveyResult routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })
  beforeEach(async () => {
    surveyResultCollection = await mongoHelper.getCollection('surveyResults')
    surveyCollection = await mongoHelper.getCollection('surveys')
    accountCollection = await mongoHelper.getCollection('accounts')
  })
  afterEach(async () => {
    await surveyResultCollection.deleteMany({})
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  describe('Put /api/surveys/{any_survey_id}/results', () => {
    test('Should return 403 without access token', async () => {
      await request(app)
        .put('/api/surveys/any_survey_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
    test('Should return 200 when it creates a new survey result', async () => {
      const { accessToken } = await makeFakeAccessToken('not_admin')
      const surveyData = {
        question: 'any_question',
        answers: [{
          image: 'any_answer',
          answer: 'any_answer'
        }, {
          answer: 'any_answer'
        }],
        date: new Date()
      }
      await surveyCollection.insertOne(surveyData)
      const survey = mongoHelper.mapper(surveyData)
      await request(app)
        .put(`/api/surveys/${survey.id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer'
        })
        .expect(200)
    })
    test('Should return 200 when it update a survey result', async () => {
      const { accessToken, id } = await makeFakeAccessToken('not_admin')
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
      const survey = mongoHelper.mapper(surveyData)

      const surveyResultData = {
        surveyId: survey.id,
        answer: 'any_answer',
        accountId: id,
        date: new Date()
      }
      await surveyResultCollection.insertOne(surveyResultData)
      await request(app)
        .put(`/api/surveys/${survey.id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'other_answer'
        })
        .expect(200)
    })
  })

  describe('Get /api/surveys/{any_survey_id}/results', () => {
    test('Should return 403 without access token', async () => {
      await request(app)
        .get('/api/surveys/any_survey_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
    test('Should return 200 when it loads survey result', async () => {
      const { accessToken } = await makeFakeAccessToken('not_admin')
      const surveyData = {
        question: 'any_question',
        answers: [{
          image: 'any_answer',
          answer: 'any_answer'
        }, {
          answer: 'any_answer'
        }],
        date: new Date()
      }
      await surveyCollection.insertOne(surveyData)
      const survey = mongoHelper.mapper(surveyData)
      await request(app)
        .get(`/api/surveys/${survey.id}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
