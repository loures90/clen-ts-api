import { Collection, ObjectId } from 'mongodb'
import { mongoHelper } from '../../../../src/infra/db/mongodb'
import mockdate from 'mockdate'
import { SurveyResultRepository } from '../../../../src/infra/db/mongodb/survey-result-repository'
import { SurveyModel } from '../../../../src/domain/model/survey'
import { AccountModel } from '../../../../src/domain/model/account'

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

  const mockSurvey = async (): Promise<SurveyModel> => {
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
    const res = await surveyCollection.insertOne(surveyData)
    const survey = await surveyCollection.findOne({ _id: res.insertedId })
    return mongoHelper.mapper(survey)
  }

  const mockAccountId = async (): Promise<string> => {
    const fakeAccount = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    }
    const res = await accountCollection.insertOne(fakeAccount)
    return res.insertedId.toHexString()
  }

  const makeSut = (): SurveyResultRepository => {
    return new SurveyResultRepository()
  }
  describe('add()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      const sut = makeSut()
      await sut.add({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId)
      })
      expect(surveyResult).toBeTruthy()
    })
  })

  /*
  test('Should call add and save a SurveyResult on success', async () => {
    const survey = await mockSurvey()
    const accountId = await mockAccountId()

    const surveyResultData = {
      accountId: accountId,
      surveyId: survey.id,
      answer: 'any_answer',
      date: new Date()
    }
    const sut = makeSut()
    await sut.add(surveyResultData)
    const surveyResultResponse = await sut.loadBySurveyId(survey.id, accountId)
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

  describe('loadBySurveyId()', () => {
    test('Should load survey result', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      const accountId2 = await mockAccountId()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId2),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
      expect(surveyResult.answers.length).toBe(survey.answers.length)
    })

    test('Should load survey result 2', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      const accountId2 = await mockAccountId()
      const accountId3 = await mockAccountId()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId2),
        answer: survey.answers[1].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId3),
        answer: survey.answers[1].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId2)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(67)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(33)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
      expect(surveyResult.answers.length).toBe(survey.answers.length)
    })

    test('Should load survey result 3', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      const accountId2 = await mockAccountId()
      const accountId3 = await mockAccountId()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId2),
        answer: survey.answers[1].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId3)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(false)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
      expect(surveyResult.answers.length).toBe(survey.answers.length)
    })

    test('Should return null if there is no survey result', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)
      expect(surveyResult).toBeNull()
    })
  })*/
})

