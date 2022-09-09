import { Collection, ObjectId } from 'mongodb'
import { mongoHelper } from '../helpers/mongo-helper'
import mockdate from 'mockdate'
import { SurveyResultRepository } from './survey-result-repository'
import { SurveyModel } from '../../../../domain/model/survey'
import { AccountModel } from '../../../../domain/model/account'

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

  const makeSurvey = async (): Promise<SurveyModel> => {
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
    return mongoHelper.mapper(surveyData)
  }

  const makeAccount = async (): Promise<AccountModel> => {
    const fakeAccount = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    }
    await accountCollection.insertOne(fakeAccount)
    return mongoHelper.mapper(fakeAccount)
  }

  const makeSut = (): SurveyResultRepository => {
    return new SurveyResultRepository()
  }
  test('Should call add and save a SurveyResult on success', async () => {
    const survey = await makeSurvey()
    const account = await makeAccount()

    const surveyResultData = {
      accountId: account.id,
      surveyId: survey.id,
      answer: 'any_answer',
      date: new Date()
    }
    const sut = makeSut()
    await sut.add(surveyResultData)
    const surveyResultResponse = await sut.loadBySurveyId(survey.id)
    expect(surveyResultResponse).toBeTruthy()
    expect(surveyResultResponse.surveyId.toString()).toBe(survey.id)
    expect(surveyResultResponse.question).toBe('any_question')
    expect(surveyResultResponse.answers).toBeTruthy()
    expect(surveyResultResponse.answers[0].answer).toBe('any_answer')
    expect(surveyResultResponse.answers[0].count).toBe(1)
    expect(surveyResultResponse.answers[0].percent).toBe(100)
    expect(surveyResultResponse.answers[1].answer).toBe('other_answer')
    expect(surveyResultResponse.answers[1].count).toBe(0)
    expect(surveyResultResponse.answers[1].percent).toBe(0)
    expect(surveyResultResponse.date).toBeTruthy()
  })

  test('Should update a survey result', async () => {
    const survey = await makeSurvey()
    const account = await makeAccount()
    const firstAnswer = {
      accountId: account.id,
      surveyId: survey.id,
      answer: 'any_answer',
      date: new Date()
    }
    await surveyResultCollection.insertOne(firstAnswer)

    const surveyResultData = {
      accountId: account.id,
      surveyId: survey.id,
      answer: 'other_answer',
      date: new Date()
    }
    const sut = makeSut()
    await sut.add(surveyResultData)
    const surveyResultResponse = await sut.loadBySurveyId(survey.id)
    expect(surveyResultResponse).toBeTruthy()
    expect(surveyResultResponse.surveyId.toString()).toBe(survey.id)
    expect(surveyResultResponse.question).toBe('any_question')
    expect(surveyResultResponse.answers).toBeTruthy()
    expect(surveyResultResponse.answers[0].answer).toBe('other_answer')
    expect(surveyResultResponse.answers[0].count).toBe(1)
    expect(surveyResultResponse.answers[0].percent).toBe(100)
    expect(surveyResultResponse.answers[1].answer).toBe('any_answer')
    expect(surveyResultResponse.answers[1].count).toBe(0)
    expect(surveyResultResponse.answers[1].percent).toBe(0)
    expect(surveyResultResponse.date).toBeTruthy()
  })

  test('Should load a survey by surveyid', async () => {
    const survey = await makeSurvey()
    const account = await makeAccount()

    await surveyResultCollection.findOneAndUpdate({
      accountId: new ObjectId(account.id),
      surveyId: new ObjectId(survey.id)
    }, {
      $set: {
        answer: 'any_answer',
        date: new Date()
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })
    const sut = makeSut()
    const surveyResultResponse = await sut.loadBySurveyId(survey.id)
    expect(surveyResultResponse).toBeTruthy()
    expect(surveyResultResponse.surveyId.toString()).toBe(survey.id)
    expect(surveyResultResponse.question).toBe('any_question')
    expect(surveyResultResponse.answers).toBeTruthy()
    expect(surveyResultResponse.answers[0].answer).toBe('any_answer')
    expect(surveyResultResponse.answers[0].count).toBe(1)
    expect(surveyResultResponse.answers[0].percent).toBe(100)
    expect(surveyResultResponse.answers[1].answer).toBe('other_answer')
    expect(surveyResultResponse.answers[1].count).toBe(0)
    expect(surveyResultResponse.answers[1].percent).toBe(0)
    expect(surveyResultResponse.date).toBeTruthy()
  })
})
