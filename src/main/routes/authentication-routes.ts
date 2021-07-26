import { Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeLoginController } from '@/main/factories/controllers/login/login-controller-factory'
import { makeSignUpController } from '@/main/factories/controllers/signup/signup-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
