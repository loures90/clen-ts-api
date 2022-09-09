import { SurveyResultModel } from '../add-survey-result/db-add-survey-result-protocols'
import { LoadSurveyResult, LoadSurveyResultRepository } from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return await new Promise(resolve => resolve(null))
  }
}
