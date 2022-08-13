import { Controller, HttpResponse, HttpRequest, LoadSurveys } from './protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return await new Promise(resolve => resolve(null))
  }
}
