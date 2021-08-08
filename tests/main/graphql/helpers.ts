import { ApolloServer } from 'apollo-server-express'

import schemaDirectives from '@/main/graphql/directives'
import resolvers from '@/main/graphql/resolvers'
import typeDefs from '@/main/graphql/type-defs'
import { makeExecutableSchema } from '@graphql-tools/schema'

export const makeApolloServer = (): ApolloServer =>
  new ApolloServer({
    schema: makeExecutableSchema({
      resolvers,
      typeDefs,
      schemaDirectives
    })
  })
