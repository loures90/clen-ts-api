import mockdate from 'mockdate'
import { DBAddSurveyResult } from './db-add-survey-result'
import { AddSurveyResultParams, AddSurveyResultRepository } from './db-add-survey-result-protocols'
import { mockSurveyResult, mockAddSurveyResult, makeAddSurveyResultRepository } from '../../../test'

type SutTypes = {
  sut: DBAddSurveyResult
  addSurveyResultRepositoryStub: AddSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const addSurveyResultRepositoryStub = makeAddSurveyResultRepository()
  const sut = new DBAddSurveyResult(addSurveyResultRepositoryStub)
  return {
    sut,
    addSurveyResultRepositoryStub
  }
}

describe('DbAddSurvey', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Should call AddSurveyResultRepository with correct values', async () => {
    const { sut, addSurveyResultRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyResultRepositoryStub, 'add')
    const surveyResultData: AddSurveyResultParams = mockAddSurveyResult()
    await sut.add(surveyResultData)
    expect(addSpy).toHaveBeenCalledWith(mockAddSurveyResult())
  })
  test('Should return a SurveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.add(mockAddSurveyResult())
    expect(surveyResult).toEqual(mockSurveyResult())
  })
  test('Should throws when addSurveyResultRepository throws', async () => {
    const { sut, addSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(addSurveyResultRepositoryStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(mockAddSurveyResult())
    await expect(promise).rejects.toThrow()
  })
})
