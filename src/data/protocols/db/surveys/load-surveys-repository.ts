import { SurveyModel } from '../../../../domain/model/survey'

export interface LoadSurveysRepository {
  loadAll (accountId: string): Promise<SurveyModel[]>
}
