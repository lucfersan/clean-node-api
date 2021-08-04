import {
  makeDbLoadSurveyResult,
  makeLogControllerDecorator,
  makeDbCheckSurveyById
} from '@/main/factories'
import { LoadSurveyResultController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResultController = new LoadSurveyResultController(
    makeDbCheckSurveyById(),
    makeDbLoadSurveyResult()
  )
  return makeLogControllerDecorator(loadSurveyResultController)
}
