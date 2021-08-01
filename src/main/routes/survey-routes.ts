import { Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import {
  makeLoadSurveysController,
  makeAddSurveyController
} from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
