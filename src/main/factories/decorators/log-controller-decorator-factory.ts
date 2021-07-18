import { LogMongoRepository } from '@/infra/db'
import { LogControllerDecorator } from '@/main/decorators'
import { Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (
  controller: Controller
): LogControllerDecorator => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
