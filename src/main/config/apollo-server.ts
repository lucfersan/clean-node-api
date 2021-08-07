import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import { GraphQLError } from 'graphql'

import resolvers from '@/main/graphql/resolvers'
import typeDefs from '@/main/graphql/type-defs'

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  errors?.forEach(e => {
    response.data = undefined
    if (checkError(e, 'UserInputError')) {
      response.http.status = 400
    } else if (checkError(e, 'AuthenticationError')) {
      response.http.status = 401
    } else if (checkError(e, 'ForbiddenError')) {
      response.http.status = 403
    } else {
      response.http.status = 500
    }
  })
}

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError?.name].some(
    name => name === errorName
  )
}

export default async function setupApolloServer(app: Express): Promise<void> {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [
      {
        requestDidStart: async () => ({
          willSendResponse: async ({ response, errors }) => {
            handleErrors(response, errors)
          }
        })
      }
    ]
  })
  await server.start()
  server.applyMiddleware({ app })
}
