import { ApolloServer, gql } from 'apollo-server-express'
import { hash } from 'bcrypt'
import ObjectId from 'bson-objectid'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'

import { MongoHelper } from '@/infra/db'
import env from '@/main/config/env'

import { makeApolloServer } from './helpers'

const mockAccessToken = async (): Promise<string> => {
  const password = await hash('any_password', 12)
  const result = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password,
    role: 'admin'
  })
  const id = result.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret, {
    expiresIn: '1d'
  })
  await accountCollection.updateOne(
    { _id: id },
    {
      $set: {
        accessToken
      }
    }
  )
  return accessToken
}

let accountCollection: Collection
let surveyCollection: Collection
let surveyResultCollection: Collection
let apolloServer: ApolloServer
describe('SurveyResult GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('SurveyResult Query', () => {
    const surveyResultQuery = gql`
      query ($surveyId: String!) {
        surveyResult(surveyId: $surveyId) {
          question
          answers {
            answer
            count
            percent
            isAnswerFromCurrentAccount
          }
          date
        }
      }
    `

    it('should return a survey result', async () => {
      const accessToken = await mockAccessToken()
      const now = new Date()
      const surveyRes = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          },
          {
            answer: 'other_answer'
          }
        ],
        date: now
      })
      apolloServer.requestOptions.context = {
        req: {
          headers: {
            'x-access-token': accessToken
          }
        }
      }
      const res = await apolloServer.executeOperation({
        query: surveyResultQuery,
        variables: {
          surveyId: String(surveyRes.ops[0]._id)
        }
      })
      expect(res.data.surveyResult.question).toBe('any_question')
      expect(res.data.surveyResult.answers).toEqual([
        {
          answer: 'any_answer',
          count: 0,
          percent: 0,
          isAnswerFromCurrentAccount: false
        },
        {
          answer: 'other_answer',
          count: 0,
          percent: 0,
          isAnswerFromCurrentAccount: false
        }
      ])
      expect(res.data.surveyResult.date).toBe(now.toISOString())
    })

    it('should return AccessDenied if no accessToken is provided', async () => {
      const res = await apolloServer.executeOperation({
        query: surveyResultQuery,
        variables: {
          surveyId: new ObjectId().toHexString()
        }
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Access denied')
    })
  })
})
