import { SurveyResultModel } from '../../../../domain/model/survey-result'
import { AddSurveyResultModel } from '../../../../domain/usecases/add-survey-result'

export interface AddSurveyResultRepository {
  add (data: AddSurveyResultModel): Promise<SurveyResultModel>
}
