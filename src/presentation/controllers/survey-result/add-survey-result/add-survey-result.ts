import { InvalidParamError } from '../../../errors'
import { forbidden } from '../../../helpers/http/http-helpers'
import { LoadSurveyById, Controller, HttpRequest, HttpResponse } from './protocols'

export class AddSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.survey_id)
    if (!survey) {
      return forbidden(new InvalidParamError('survey_id'))
    }
    return null
  }
}
