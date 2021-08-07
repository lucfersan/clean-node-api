import { gql } from 'apollo-server-express'

export default gql`
  scalar DateTime

  directive @authDirective on FIELD_DEFINITION

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`
