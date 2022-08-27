import { InvalidParamError } from '../../../errors'
import { LoadSurveyById, Controller, HttpRequest, HttpResponse, forbidden, serverError, AddSurveyResult } from './protocols'

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
      } else {
        return forbidden(new InvalidParamError('survey_id'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
