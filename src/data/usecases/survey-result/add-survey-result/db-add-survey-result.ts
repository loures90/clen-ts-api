import { SurveyResultModel, AddSurveyResult, AddSurveyResultParams, AddSurveyResultRepository } from './db-add-survey-result-protocols'

export class DBAddSurveyResult implements AddSurveyResult {
  constructor (private readonly addSurveyResultRepository: AddSurveyResultRepository) { }
  async add (data: AddSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResult = await this.addSurveyResultRepository.add(data)
    return surveyResult
  }
}
