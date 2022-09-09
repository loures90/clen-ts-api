import { HttpRequest, HttpResponse, Controller, LoadSurveyById, forbidden, InvalidParamError, serverError } from './protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const isSurveyValid = await this.loadSurveyById.loadById(surveyId)
      if (!isSurveyValid) {
        return forbidden(new InvalidParamError('survey_id'))
      }
      return await new Promise(resolve => resolve(null))
    } catch (error) {
      return serverError(error)
    }
  }
}
