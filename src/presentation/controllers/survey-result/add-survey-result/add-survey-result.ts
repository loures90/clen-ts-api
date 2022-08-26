import { InvalidParamError } from '../../../errors'
import { LoadSurveyById, Controller, HttpRequest, HttpResponse, forbidden, serverError } from './protocols'

export class AddSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.survey_id)
      if (!survey) {
        return forbidden(new InvalidParamError('survey_id'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
