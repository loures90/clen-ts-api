import { LoadSurveyById, Controller, HttpRequest, HttpResponse } from './protocols'

export class AddSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.survey_id)
    return null
  }
}
