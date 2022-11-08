import { LogMongoRepository } from '../../../../infra/db/mongodb'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log'

export const makeLogDecorator = (controller: Controller): Controller => {
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
