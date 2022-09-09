import { SurveyResultModel, AddSurveyResult, AddSurveyResultParams, AddSurveyResultRepository, LoadSurveyResultRepository } from './db-add-survey-result-protocols'

export class DBAddSurveyResult implements AddSurveyResult {
  constructor (
    private readonly addSurveyResultRepository: AddSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) { }

  async add (data: AddSurveyResultParams): Promise<SurveyResultModel> {
    await this.addSurveyResultRepository.add(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
    return surveyResult
  }
}
