import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveysController } from '@/main/factories'

export default {
  Query: {
    surveys: async (_: any, args: any, context: any) =>
      adaptResolver(makeLoadSurveysController(), args, context)
  }
}
