import { DbLoadSurveyById } from './db-load-survey-by-id'
import mockdate from 'mockdate'
import { LoadSurveyByIdRepositorySpy, mockSurvey } from '../../../test'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadSurveyByIdRepositorySpy
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Ensure DbLoadSurveyById calls LoadSurveysRepository correctly', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    await sut.loadById('any_id')
    expect(loadSurveyByIdRepositorySpy.id).toBe('any_id')
  })
  test('Ensure DbLoadSurveyById returns a survey on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.loadById('any_id')
    expect(survey).toEqual(mockSurvey())
  })
  test('Should throws when LoadSurveysRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
