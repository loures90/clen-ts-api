import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredParams = ['name', 'email']
    for (const param of requiredParams) {
      if (!httpRequest.body[param]) {
        return badRequest(new MissingParamError(param))
      }
    }
  }
}
