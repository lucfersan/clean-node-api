import { adaptResolver } from '@/main/adapters'
import { makeLoginController, makeSignUpController } from '@/main/factories'

export default {
  Query: {
    login: async (_: any, args: any) => {
      return adaptResolver(makeLoginController(), args)
    }
  },

  Mutation: {
    signUp: async (_: any, args: any) => {
      return adaptResolver(makeSignUpController(), args)
    }
  }
}
