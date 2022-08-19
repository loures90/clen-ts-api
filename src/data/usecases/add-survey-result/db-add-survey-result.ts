import { SurveyResultModel } from '../../../domain/model/survey-result'
import { AddSurveyResult, AddSurveyResultModel } from '../../../domain/usecases/add-survey-result'
import { AddSurveyResultRepository } from '../../protocols/db/survey-result/add-survey-result-repository'

export class DBAddSurveyResult implements AddSurveyResult {
  constructor (private readonly addSurveyResultRepository: AddSurveyResultRepository) { }
  async add (data: AddSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.addSurveyResultRepository.add(data)
    return surveyResult
  }
}
