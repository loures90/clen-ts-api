import { InvalidParamError } from '../../../errors'
import { LoadSurveyById, Controller, HttpRequest, HttpResponse, forbidden, serverError, AddSurveyResult, AddSurveyResultModel } from './protocols'

export class AddSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly addSurveyResult: AddSurveyResult) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.survey_id)
      if (survey) {
        const answerIsValid = survey.answers.filter(surveyAnswer => surveyAnswer.answer === httpRequest.body.answer)
        if (!answerIsValid.length) {
          return forbidden(new InvalidParamError('answer'))
        }
        const inputSurveyResult: AddSurveyResultModel = {
          accountId: httpRequest.account_id,
          surveyId: httpRequest.params.survey_id,
          answer: httpRequest.body.answer,
          date: new Date()
        }
        await this.addSurveyResult.add(inputSurveyResult)
      } else {
        return forbidden(new InvalidParamError('survey_id'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
