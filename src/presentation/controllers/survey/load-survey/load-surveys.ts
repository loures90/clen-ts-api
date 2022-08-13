import { ok } from '../../../helpers/http/http-helpers'
import { Controller, HttpResponse, HttpRequest, LoadSurveys } from './protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return ok(surveys)
  }
}
