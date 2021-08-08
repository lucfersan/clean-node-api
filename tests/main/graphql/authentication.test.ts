import { ApolloServer, gql } from 'apollo-server-express'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'

import { MongoHelper } from '@/infra/db'

import { makeApolloServer } from './helpers'

describe('Authentication GraphQL', () => {
  let accountCollection: Collection
  let apolloServer: ApolloServer

  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Login Query', () => {
    const loginQuery = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          name
        }
      }
    `

    it('should return an account on valid credentials', async () => {
      const password = await hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })
      const res = await apolloServer.executeOperation({
        query: loginQuery,
        variables: { email: 'any_email@mail.com', password: 'any_password' }
      })
      expect(res.data.login.accessToken).toBeTruthy()
      expect(res.data.login.name).toBe('any_name')
    })
  })
})
