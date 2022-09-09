import schemas from './schemas-container'
import { badRequest, serverError, unauthorized, notFound, forbidden } from './components'

export default {
  securitySchemes: {
    apiKeyAuth: schemas.apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
}
