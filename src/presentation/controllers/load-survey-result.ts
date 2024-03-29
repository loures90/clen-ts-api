import { HttpRequest, HttpResponse, Controller, LoadSurveyById, forbidden, InvalidParamError, serverError, LoadSurveyResult, ok } from './protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveyId = httpRequest.params.survey_id
      const accountId = httpRequest.account_id
      const isSurveyValid = await this.loadSurveyById.loadById(surveyId)
      if (!isSurveyValid) {
        return forbidden(new InvalidParamError('survey_id'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, accountId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
