import { SurveyRepository } from './survey'
import { Collection } from 'mongodb'
import mongoHelper from '../helpers/mongo-helper'
import mockdate from 'mockdate'

describe('Survey MongoRepository', () => {
  let surveyCollection: Collection
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
    mockdate.set(new Date())
  })
  beforeEach(async () => {
    surveyCollection = await mongoHelper.getCollection('surveys')
  })
  afterEach(async () => {
    await surveyCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
    mockdate.reset()
  })

  const makeSut = (): SurveyRepository => {
    return new SurveyRepository()
  }
  test('Should call add and return null on success', async () => {
    const sut = makeSut()
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
    await sut.add(surveyData)
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    const surveyResponse = mongoHelper.mapper(survey)
    expect(surveyResponse).toBeTruthy()
    expect(surveyResponse.id).toBeTruthy()
    expect(surveyResponse.question).toBe('any_question')
    expect(surveyResponse.answers.length).toBe(2)
  })
})
