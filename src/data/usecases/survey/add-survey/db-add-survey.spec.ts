import { AddSurvey, AddSurveyParams } from './db-add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'
import mockdate from 'mockdate'
import { AddSurveyRepositorySpy } from '../../../test'

type SutTypes = {
  sut: AddSurvey
  addSurveyRepositorySpy: AddSurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
  const sut = new DbAddSurvey(addSurveyRepositorySpy)
  return {
    sut,
    addSurveyRepositorySpy
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
    const { sut, addSurveyRepositorySpy } = makeSut()
    const surveyData: AddSurveyParams = mockSurveyData()
    await sut.add(surveyData)
    expect(addSurveyRepositorySpy.surveyData).toBe(surveyData)
  })
  test('Should throws when AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    jest.spyOn(addSurveyRepositorySpy, 'add').mockImplementationOnce(async () => {
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
