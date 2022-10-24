import mockdate from 'mockdate'
import { DBAddSurveyResult } from './db-add-survey-result'
import { AddSurveyResultParams } from './db-add-survey-result-protocols'
import { mockSurveyResult, mockAddSurveyResult, AddSurveyResultRepositorySpy, LoadSurveyResultRepositorySpy } from '../../../test'

type SutTypes = {
  sut: DBAddSurveyResult
  addSurveyResultRepositorySpy: AddSurveyResultRepositorySpy
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
  const addSurveyResultRepositorySpy = new AddSurveyResultRepositorySpy()
  const sut = new DBAddSurveyResult(addSurveyResultRepositorySpy, loadSurveyResultRepositorySpy)
  return {
    sut,
    addSurveyResultRepositorySpy,
    loadSurveyResultRepositorySpy
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
    const { sut, addSurveyResultRepositorySpy } = makeSut()
    const surveyResultData: AddSurveyResultParams = mockAddSurveyResult()
    await sut.add(surveyResultData)
    expect(addSurveyResultRepositorySpy.data).toEqual(mockAddSurveyResult())
  })
  test('Should return a SurveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.add(mockAddSurveyResult())
    expect(surveyResult).toEqual(mockSurveyResult())
  })
  test('Should throws when addSurveyResultRepository throws', async () => {
    const { sut, addSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(addSurveyResultRepositorySpy, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(mockAddSurveyResult())
    await expect(promise).rejects.toThrow()
  })

  test('Should call loadSurveyById with correct id', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    await sut.add(mockAddSurveyResult())
    expect(loadSurveyResultRepositorySpy.surveyId).toBe('any_survey_id')
  })

  test('Should throws when addSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(mockAddSurveyResult())
    await expect(promise).rejects.toThrow()
  })
})
