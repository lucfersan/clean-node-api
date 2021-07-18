import { Router } from 'express'

import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeLoadSurveysController } from '@/main/factories'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
