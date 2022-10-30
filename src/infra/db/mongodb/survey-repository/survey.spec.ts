import { SurveyRepository } from './survey'
import { Collection, ObjectId } from 'mongodb'
import { mongoHelper } from '../helpers'
import mockdate from 'mockdate'
import { faker } from '@faker-js/faker'
import { AddSurveyParams } from '../../../../domain/usecases/add-survey'
import { AccountModel } from '../../../../domain/model/account'

const mockSurveyData = (): AddSurveyParams => ({
  question: faker.random.word(),
  answers: [{
    image: faker.random.word(),
    answer: faker.random.word()
  }, {
    answer: faker.random.word()
  }],
  date: new Date()
})

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

  const makeSut = (): SurveyRepository => {
    return new SurveyRepository()
  }

  const mockAccount = async (): Promise<AccountModel> => {
    const fakeAccount = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    }
    await accountCollection.insertOne(fakeAccount)
    return mongoHelper.mapper(fakeAccount)
  }
  describe('add', () => {
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
  describe('LoadAll', () => {
    test('Should call LoadAll and return a list of surveys on success', async () => {
      const account = await mockAccount()
      const addSurveyModels = [mockSurveyData(), mockSurveyData()]
      const result = await surveyCollection.insertMany(addSurveyModels)

      const surveyResult = await surveyCollection.findOne({ question: addSurveyModels[0].question })
      const survey = mongoHelper.mapper(surveyResult)

      await surveyResultCollection.insertOne({
        accountId: account.id,
        surveyId: result.insertedIds['0'],
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const sut = makeSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys).toBeTruthy()
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[0].answers.length).toBe(2)
      // expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[0].date).toBeTruthy()
      expect(surveys[1].id).toBeTruthy()
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
      expect(surveys[1].answers.length).toBe(2)
      expect(surveys[1].didAnswer).toBe(false)
      expect(surveys[1].date).toBeTruthy()
    })
    test('Should call LoadAll and return an empty list when no survey is found', async () => {
      const account = await mockAccount()
      const sut = makeSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys).toBeTruthy()
      expect(surveys.length).toBe(0)
    })
  })

  describe('LoadById', () => {
    test('Should call LoadById and return a survey on success', async () => {
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
      const sut = makeSut()
      const surveyResponse = await sut.loadById(survey.id)

      expect(surveyResponse).toBeTruthy()
      expect(surveyResponse.id).toBeTruthy()
      expect(surveyResponse.question).toBe('any_question')
      expect(surveyResponse.answers.length).toBe(2)
    })
    test('Should call LoadById and return null if survey is not found', async () => {
      const sut = makeSut()
      const id = new ObjectId('507f191e810c19729de860ea').toString()
      const surveyResponse = await sut.loadById(id)

      expect(surveyResponse).toBeNull()
    })
  })
})
