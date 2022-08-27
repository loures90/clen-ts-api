import { AddSurveyRepository, AddSurvey, AddSurveyParams } from './db-add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'
import mockdate from 'mockdate'
import { mockAddSurveyRepository } from '../../../test'

type SutTypes = {
  sut: AddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

const mockSurveyData = (): AddSurveyParams => ({
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
    const surveyData: AddSurveyParams = mockSurveyData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
  test('Should throws when AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(mockSurveyData())
    await expect(promise).rejects.toThrow()
  })
  test('Should return null on success', async () => {
    const { sut } = makeSut()
    const surveyData: AddSurveyParams = mockSurveyData()
    const response = await sut.add(surveyData)
    expect(response).toBeNull()
  })
})
