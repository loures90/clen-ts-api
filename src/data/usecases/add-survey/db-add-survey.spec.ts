import { AddSurveyRepository, AddSurvey, AddSurveyModel } from './db-add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'
import mockdate from 'mockdate'

interface SutTypes {
  sut: AddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new AddSurveyRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_answer',
    answer: 'any_answer'
  }],
  date: new Date()
})

describe('DbAddSurvey', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData: AddSurveyModel = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
  test('Should throws when AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(makeFakeSurveyData())
    await expect(promise).rejects.toThrow()
  })
  test('Should return null on success', async () => {
    const { sut } = makeSut()
    const surveyData: AddSurveyModel = makeFakeSurveyData()
    const response = await sut.add(surveyData)
    expect(response).toBeNull()
  })
})
