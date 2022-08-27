import { SurveyResultModel } from '../../../../domain/model/survey-result'
import { AddSurveyResultParams } from '../../../../domain/usecases/add-survey-result'

export interface AddSurveyResultRepository {
  add (data: AddSurveyResultParams): Promise<SurveyResultModel>
}
