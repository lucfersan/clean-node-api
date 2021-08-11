import { ApolloServer, gql } from 'apollo-server-express'
import { hash } from 'bcrypt'
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
let apolloServer: ApolloServer
describe('Survey GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Surveys Query', () => {
    const surveysQuery = gql`
      query surveys {
        surveys {
          id
          question
          answers {
            image
            answer
          }
          date
          didAnswer
        }
      }
    `

    it('should return surveys', async () => {
      const accessToken = await mockAccessToken()
      const now = new Date()
      await surveyCollection.insertOne({
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
        query: surveysQuery
      })
      expect(res.data.surveys.length).toBe(1)
      expect(res.data.surveys[0].id).toBeTruthy()
      expect(res.data.surveys[0].question).toBe('any_question')
      expect(res.data.surveys[0].answers).toEqual([
        {
          image: 'any_image',
          answer: 'any_answer'
        },
        {
          image: null,
          answer: 'other_answer'
        }
      ])
      expect(res.data.surveys[0].didAnswer).toBe(false)
      expect(res.data.surveys[0].date).toBe(now.toISOString())
    })

    it('should return AccessDenied if no accessToken is provided', async () => {
      const res = await apolloServer.executeOperation({
        query: surveysQuery
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Access denied')
    })
  })
})
