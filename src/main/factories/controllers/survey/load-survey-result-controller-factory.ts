import {
  makeDbLoadSurveyById,
  makeDbLoadSurveyResult,
  makeLogControllerDecorator
} from '@/main/factories'
import { LoadSurveyResultController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResultController = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult()
  )
  return makeLogControllerDecorator(loadSurveyResultController)
}
