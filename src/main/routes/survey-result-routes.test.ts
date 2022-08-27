import { Collection } from 'mongodb'
import request from 'supertest'
import mongoHelper from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let surveyCollection: Collection
let accountCollection: Collection
describe('SurveyResult routes', () => {
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
  describe('Put /api/surveys/{any_survey_id}/results', () => {
    test('Should return 403 without access token', async () => {
      await request(app)
        .put('/api/surveys/any_survey_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})
