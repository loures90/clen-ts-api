import { Collection } from 'mongodb'
import mongoHelper from '../helpers/mongo-helper'
import mockdate from 'mockdate'
import { SurveyResultRepository } from './survey-result-repository'

describe('Survey MongoRepository', () => {
  let surveyCollection: Collection
  let surveyResultCollection: Collection
  let accountCollection: Collection
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
    mockdate.set(new Date())
  })
  beforeEach(async () => {
    surveyCollection = await mongoHelper.getCollection('surveys')
    surveyResultCollection = await mongoHelper.getCollection('survey-results')
    accountCollection = await mongoHelper.getCollection('accounts')
  })
  afterEach(async () => {
    await surveyCollection.deleteMany({})
    await surveyResultCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
    mockdate.reset()
  })

  const makeSut = (): SurveyResultRepository => {
    return new SurveyResultRepository()
  }
  test('Should call add and return a SurveyResult on success', async () => {
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

    const fakeAccount = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    }
    await accountCollection.insertOne(fakeAccount)
    const account = mongoHelper.mapper(fakeAccount)

    const surveyResultData = {
      accountId: account.id,
      surveyId: survey.id,
      answer: 'any_answer',
      date: new Date()
    }
    const sut = makeSut()
    const surveyResultResponse = await sut.add(surveyResultData)
    expect(surveyResultResponse).toBeTruthy()
    expect(surveyResultResponse.id).toBeTruthy()
    expect(surveyResultResponse.surveyId).toBe(survey.id)
    expect(surveyResultResponse.accountId).toBe(account.id)
    expect(surveyResultResponse.answer).toBe('any_answer')
    expect(surveyResultResponse.date).toBeTruthy()
  })
})
