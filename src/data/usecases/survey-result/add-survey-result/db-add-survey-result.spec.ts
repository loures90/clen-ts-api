import mockdate from 'mockdate'
import { DBAddSurveyResult } from './db-add-survey-result'
import { SurveyResultModel, AddSurveyResultModel, AddSurveyResultRepository } from './db-add-survey-result-protocols'

const makeAddFakeSurveyResult = (): AddSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => Object.assign({}, makeAddFakeSurveyResult(), { id: 'any_id' })

type SutTypes = {
  sut: DBAddSurveyResult
  addSurveyResultRepositoryStub: AddSurveyResultRepository
}

const makeAddSurveyResultRepository = (): AddSurveyResultRepository => {
  class AddSurveyResultRepositoryStub implements AddSurveyResultRepository {
    async add (data: AddSurveyResultModel): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }
  return new AddSurveyResultRepositoryStub()
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
    const surveyResultData: AddSurveyResultModel = makeFakeSurveyResult()
    await sut.add(surveyResultData)
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyResult())
  })
  test('Should return a SurveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.add(makeFakeSurveyResult())
    expect(surveyResult).toEqual(makeFakeSurveyResult())
  })
  test('Should throws when addSurveyResultRepository throws', async () => {
    const { sut, addSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(addSurveyResultRepositoryStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(makeFakeSurveyResult())
    await expect(promise).rejects.toThrow()
  })
})
