import { SurveyResultModel } from '../add-survey-result/db-add-survey-result-protocols'
import { LoadSurveyResult, LoadSurveyResultRepository, LoadSurveyByIdRepository } from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) { }

  async load (surveyId: string): Promise<SurveyResultModel> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: []
      }
      for (const answer of survey.answers) {
        surveyResult.answers.push({
          image: answer.image,
          answer: answer.answer,
          count: 0,
          percent: 0
        })
      }
    }
    return surveyResult
  }
}
