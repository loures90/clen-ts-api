import { SurveyResultModel, LoadSurveyResultRepository } from './db-load-survey-result-protocols'
import { DbLoadSurveyResult } from './db-load-survey-result'

describe('DB Load Survey Result', () => {
  test('Should call loadSurveyById with correct id', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        return await new Promise(resolve => resolve({
          question: 'any_question',
          surveyId: 'any_survey_id',
          answers: [{
            answer: 'any_answer',
            image: 'any_image',
            count: 1,
            percent: 50
          },
          {
            answer: 'other_answer',
            image: 'other_image',
            count: 1,
            percent: 50
          }],
          date: new Date()
        }))
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
