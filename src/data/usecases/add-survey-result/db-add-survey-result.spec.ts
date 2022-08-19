import mockdate from 'mockdate'
import { DBAddSurveyResult } from './db-add-survey-result'
import { AddSurveyResultRepository } from '../../protocols/db/survey-result/add-survey-result-repository'
import { AddSurveyResultModel } from '../../../domain/usecases/add-survey-result'
import { SurveyResultModel } from '../../../domain/model/survey-result'

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
})
