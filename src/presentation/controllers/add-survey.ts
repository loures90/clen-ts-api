import { badRequest, noContent, serverError } from '../../../src/presentation/helpers/http/http-helpers'
import { Controller, HttpRequest, HttpResponse, Validation, AddSurvey } from './protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const date = new Date()
      await this.addSurvey.add({ ...httpRequest.body, date })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
