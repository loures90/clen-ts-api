import { Collection } from 'mongodb'
import request from 'supertest'
import mongoHelper from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let surveyCollection: Collection
describe('AddSurvey routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })
  beforeEach(async () => {
    surveyCollection = await mongoHelper.getCollection('surveys')
  })
  afterEach(async () => {
    await surveyCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })
  describe('POST / addSurvey', () => {
    test('Should return 204 on success', async () => {
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
        .expect(204)
    })
  })
})
