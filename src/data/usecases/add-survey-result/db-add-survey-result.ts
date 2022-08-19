import { SurveyResultModel, AddSurveyResult, AddSurveyResultModel, AddSurveyResultRepository } from './db-add-survey-result-protocols'

export class DBAddSurveyResult implements AddSurveyResult {
  constructor (private readonly addSurveyResultRepository: AddSurveyResultRepository) { }
  async add (data: AddSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.addSurveyResultRepository.add(data)
    return surveyResult
  }
}
