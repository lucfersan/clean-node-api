import { adaptResolver } from '@/main/adapters'
import {
  makeLoadSurveyResultController,
  makeSaveSurveyResultController
} from '@/main/factories'

export default {
  Query: {
    surveyResult: async (_: any, args: any) =>
      adaptResolver(makeLoadSurveyResultController(), args)
  },

  Mutation: {
    saveSurveyResult: async (_: any, args: any) =>
      adaptResolver(makeSaveSurveyResultController(), args)
  }
}
