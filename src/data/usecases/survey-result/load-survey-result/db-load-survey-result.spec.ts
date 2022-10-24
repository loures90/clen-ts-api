import {
  LoadSurveyResult,
  mockSurveyResult
} from './db-load-survey-result-protocols'
import { DbLoadSurveyResult } from './db-load-survey-result'
import mockdate from 'mockdate'
import { LoadSurveyByIdRepositorySpy, LoadSurveyResultRepositorySpy } from '../../../test'

type SutTypes = {
  sut: LoadSurveyResult
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadSurveyResultRepositorySpy,
    loadSurveyByIdRepositorySpy
  }
}

describe('DB Load Survey Result', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Should call loadSurveyById with correct id', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    await sut.load('any_survey_id')
    expect(loadSurveyResultRepositorySpy.surveyId).toBe('any_survey_id')
  })

  test('Should throw if loadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.load('any_survey_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a surveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.load('any_survey_id')
    expect(surveyResult).toEqual(mockSurveyResult())
  })

  test('Should call loadSurveyById with correct value when loadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    await sut.load('other_survey_id')
    expect(loadSurveyByIdRepositorySpy.id).toBe('other_survey_id')
  })

  test('Should return a surevey result with count and percent equals to 0', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const surveyResult = await sut.load('any_survey_id')
    expect(surveyResult).toEqual({
      surveyId: 'any_id',
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer',
        count: 0,
        percent: 0
      }, {
        image: 'other_image',
        answer: 'other_answer',
        count: 0,
        percent: 0
      }],
      date: new Date()
    })
  })

  test('Should throw if loadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.load('other_survey_id')
    await expect(promise).rejects.toThrow()
  })
})
