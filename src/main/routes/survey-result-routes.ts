import { Router } from 'express'

import { adaptRoute } from '@/main/adapters/express-route-adapter'
import {
  makeSaveSurveyResultController,
  makeLoadSurveyResultController
} from '@/main/factories'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeSaveSurveyResultController())
  )

  router.get(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeLoadSurveyResultController())
  )
}
