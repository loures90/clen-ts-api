import { HttpRequest, HttpResponse, Controller, LoadSurveyById } from './protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params
    await this.loadSurveyById.loadById(surveyId)
    return await new Promise(resolve => resolve(null))
  }
}
