import { DbLoadSurveys } from './db-load-surveys'
import mockdate from 'mockdate'
import { LoadSurveyRepositorySpy, mockSurveys } from '../../../test'
import { faker } from '@faker-js/faker'

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

const mockAccountId = (): string => faker.datatype.uuid()
describe('DbLoadSurveys', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Ensure DbLoadSurveys calls LoadSurveysRepository correctly', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    const accountId: string = mockAccountId()
    await sut.load(accountId)
    expect(loadSurveyRepositorySpy.accountId).toBe(accountId)
  })
  test('Should throws when AddSurveyRepository throws', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyRepositorySpy, 'loadAll').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.load(mockAccountId())
    await expect(promise).rejects.toThrow()
  })
  test('Ensure DbLoadSurveys return a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load(mockAccountId())
    expect(surveys).toEqual(mockSurveys())
  })
})
