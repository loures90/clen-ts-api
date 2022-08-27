import { InvalidParamError } from '../../../errors'
import { LoadSurveyById, Controller, HttpRequest, HttpResponse, forbidden, serverError } from './protocols'

export class AddSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.survey_id)
      if (survey) {
        const answerIsValid = survey.answers.includes(httpRequest.body.answer)
        if (!answerIsValid) {
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
