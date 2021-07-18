import {
  makeLogControllerDecorator,
  makeDbAuthentication
} from '@/main/factories'
import { LoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation()
  )
  return makeLogControllerDecorator(loginController)
}
