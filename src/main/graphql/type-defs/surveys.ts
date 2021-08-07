import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    surveys: [Survey!]!
  }

  type Survey {
    id: ID!
    question: String!
    answers: [SurveyAnswerModel!]!
    date: DateTime!
    didAnswer: Boolean
  }

  type SurveyAnswerModel {
    image: String
    answer: String!
  }
`
