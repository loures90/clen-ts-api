import schemas from './schemas-container'
import { badRequest, serverError, unauthorized, notFound, forbidden } from './components'

export default {
  components: {
    securitySchemes: {
      apiKeyAuth: schemas.apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
