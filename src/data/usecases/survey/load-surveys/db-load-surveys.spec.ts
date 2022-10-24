import { DbLoadSurveys } from './db-load-surveys'
import mockdate from 'mockdate'
import { LoadSurveyRepositorySpy, mockSurveys } from '../../../test'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveyRepositorySpy: LoadSurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyRepositorySpy = new LoadSurveyRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveyRepositorySpy)
  return {
    sut,
    loadSurveyRepositorySpy
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Ensure DbLoadSurveys calls LoadSurveysRepository correctly', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveyRepositorySpy, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalledWith()
  })
  test('Should throws when AddSurveyRepository throws', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyRepositorySpy, 'loadAll').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
  test('Ensure DbLoadSurveys return a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockSurveys())
  })
})
