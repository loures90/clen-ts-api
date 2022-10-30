import { SurveyModel } from '../model/survey'

export interface LoadSurveys {
  load (accountId: string): Promise<SurveyModel[]>
}
