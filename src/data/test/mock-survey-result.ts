import { SurveyResultModel } from '../../domain/model/survey-result'
import { AddSurveyResultParams } from '../../domain/usecases/add-survey-result'

export const mockAddSurveyResult = (): AddSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResult = (): SurveyResultModel => Object.assign({}, mockAddSurveyResult(), { id: 'any_id' })
